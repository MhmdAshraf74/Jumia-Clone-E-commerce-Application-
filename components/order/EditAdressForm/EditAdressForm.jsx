import SelectInputField from "../selectInput/SelectInputField";
import ListHeader from "../ListHeader/ListHeader";
import SaveButton from "../Save_button/SaveButton";
import CancelButton from "../Cancle_button/CancelButton";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, firestore } from "../../../firebase";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Card, Input } from "@material-tailwind/react";
import { onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "next-i18next";
const governorates = [
  "Alexandria",
  "Aswan",
  "Asyut",
  "Beheira",
  "Beni Suef",
  "Cairo",
  "Dakahlia",
  "Damietta",
  "Faiyum",
  "Gharbia",
  "Giza",
  "Ismailia",
  "Kafr El Sheikh",
  "Luxor",
  "Matrouh",
  "Minya",
  "Monufia",
  "New Valley",
  "North Sinai",
  "Port Said",
  "Qalyubia",
  "Qena",
  "Red Sea",
  "Sohag",
  "South Sinai",
  "Suez",
];
const cairo_areas = [
  "Nasr City",
  "Heliopolis",
  "Maadi",
  "Zamalek",
  "Dokki",
  "New Cairo",
  "Mohandessin",
  "Helwan",
  "6th of October City",
  "Mokattam",
  "Abbassiya",
  "Hadayek El Kobba",
  "El Marg",
  "Shubra",
  "El Zeitoun",
  "Sayeda Zeinab",
  "Waili",
  "Manial",
  "Boulaq",
  "Bab El Shaareya",
  "Matariya",
  "Rod El Farag",
  "Khalifa",
  "Ain Shams",
  "El-Ma'asara",
  "El Khanka",
  "Benha",
  "Shubra El Kheima",
];

function EditAdressForm({ setAddressConfirm }) {
  const { t } = useTranslation("order");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    otherPhone: "",
    city: "",
    region: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    return errors;
  };
  const handleGovernorateChange = (e) => {
    setFormData({ ...formData, region: e.target.value });
  };
  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value });
  };
  const handleSubmit = async () => {
    const errors = validateForm();
    // Form is valid, submit the data
    if (Object.keys(errors).length === 0) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          // Query Firestore to find documents with the user's ID
          const orderDetailsRef = collection(firestore, "order-details");
          const q = query(orderDetailsRef, where("userId", "==", user.uid));
          getDocs(q)
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                // If documents matching the user ID exist, update the first one
                const docRef = querySnapshot.docs[0].ref;
                updateDoc(docRef, {
                  shippingAddress: formData,
                })
                  .then(() => {
                    console.log("Form data updated in Firestore");
                    setAddressConfirm(true);
                    router.push("/checkout_layout/shipping-options");
                  })
                  .catch((error) => {
                    console.error(
                      "Error updating form data in Firestore: ",
                      error
                    );
                    // Handle error updating the document
                  });
              } else {
                // If no documents matching the user ID exist, add a new one
                addDoc(orderDetailsRef, {
                  shippingAddress: formData,
                  userId: user.uid,
                })
                  .then(() => {
                    console.log("Form data added to Firestore");
                    setAddressConfirm(true);
                    router.push("/checkout_layout/shipping-options");
                  })
                  .catch((error) => {
                    console.error(
                      "Error adding form data to Firestore: ",
                      error
                    );
                    // Handle error adding the document
                  });
              }
            })
            .catch((error) => {
              console.error("Error querying documents: ", error);
              // Handle error querying documents
            });
        } else {
          // Handle unauthenticated user, e.g., display a toast notification
          setShowToast(true);
        }
      });
    } else {
      // Set errors state to display validation errors
      setErrors(errors);
    }
  };
  // console.log(addressConfirmed);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear validation errors when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  // Function to fetch existing data from Firestore and populate the form fields
  const fetchAndPopulateFormData = async (userId) => {
    const orderDetailsRef = collection(firestore, "order-details");
    const q = query(orderDetailsRef, where("userId", "==", userId));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        // Populate form fields with existing data
        setFormData(docData.shippingAddress);
      }
    } catch (error) {
      console.error("Error fetching and populating form data: ", error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchAndPopulateFormData(user.uid);
    });
    // Cleanup function to unsubscribe from onAuthStateChanged
    return () => unsubscribe();
  }, []);
  return (
    <>
      <Card className=" rounded p-3">
        <ListHeader value={t("1.CUSTOMER ADRESS")} />
        <form>
          <section className="px-0 ">
            <h6 className="uppercase mt-4 mb-2 text-xs ">{t("EDIT ADRESS")}</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              <div>
                <Input
                  // variant="outlined"
                  color="amber"
                  placeholder={t("FirstName")}
                  label={t("FirstName")}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Input
                  color="amber"
                  label={t("LastName")}
                  placeholder={t("LastName")}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div className="flex items-center mb-2 ">
                <div className="me-2 text-xs">
                  <p>{t("prefix")}</p>
                  <p>+20</p>
                </div>
                <Input
                  color="amber"
                  type="number"
                  placeholder={t("Phone Number")}
                  label={t("Phone Number")}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-600">{errors.phone}</p>
              )}
              <div className="flex items-center mb-2">
                <div className="me-2 text-xs">
                  <p>{t("prefix")}</p>
                  <p>+20</p>
                </div>
                <Input
                  color="amber"
                  type="number"
                  placeholder={t("Additional Phone Number")}
                  label={t("Additional Phone Number")}
                  name="otherPhone"
                  value={formData.otherPhone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="py-2">
              <div>
                <Input
                  color="amber"
                  label={t("Address")}
                  placeholder={t("Address")}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="text-xs text-red-600">{errors.address}</p>
                )}
              </div>
            </div>
            <div className="py-2">
              <Input
                color="amber"
                label={t("Additional Information")}
                placeholder={t("Additional Information")}
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 py-2">
              <div>
                <SelectInputField
                  governorates={governorates}
                  lableValue={t("City")}
                  name={"region"}
                  value={formData.region}
                  onChange={handleGovernorateChange}
                />
              </div>
              <div className="  mb-4 ">
                <SelectInputField
                  governorates={cairo_areas}
                  lableValue={t("Region")}
                  name={"city"}
                  value={formData.city}
                  onChange={handleCityChange}
                />
              </div>
            </div>
          </section>
          <div className="flex flex-row justify-items-center items-center  pt-2  ">
            <SaveButton
              handleSubmit={handleSubmit}
              label={t("save")}
              color="amber"
            />
          </div>
        </form>
      </Card>
    </>
  );
}

export default EditAdressForm;
