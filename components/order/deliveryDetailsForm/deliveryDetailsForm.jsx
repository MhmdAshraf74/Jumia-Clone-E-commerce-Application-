import { Label, Modal, Select } from "flowbite-react";
import ListHeader from "../ListHeader/ListHeader";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MapIcon from "@mui/icons-material/Map";
import Link from "next/link";
import { useEffect, useState } from "react";
import SaveButton from "../Save_button/SaveButton";
import CancelButton from "../Cancle_button/CancelButton";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Image from "next/image";
import { useRouter } from "next/router";
import { Card } from "@material-tailwind/react";
import { auth, fetchCartProducts, firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useTranslation } from "next-i18next";

const egyptGovernorates = [
  {
    name: "Cairo",
    areas: [
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
    ],
  },
  {
    name: "Alexandria",
    areas: ["Gleem", "Montaza", "Smouha", "Sidi Gaber", "Stanley"],
  },
  {
    name: "Aswan",
    areas: ["Aswan City", "Elephantine Island", "New Kalabsha"],
  },
  {
    name: "Asyut",
    areas: ["Asyut City", "Al-Qusiya", "Dayrout"],
  },
  {
    name: "Beheira",
    areas: ["Damanhur", "Kafr El Dawwar", "Rosetta (Rashid)"],
  },
  {
    name: "Beni Suef",
    areas: ["Beni Suef City", "El Wasta", "Biba"],
  },
  {
    name: "Dakahlia",
    areas: ["Mansoura", "Mit Ghamr", "Talkha"],
  },
  {
    name: "Damietta",
    areas: ["Damietta City", "New Damietta", "Kafr Saad"],
  },
  {
    name: "Faiyum",
    areas: ["Faiyum City", "Tamiya", "Ibsheway"],
  },
  {
    name: "Gharbia",
    areas: ["Tanta", "Mahalla El Kubra", "Zifta"],
  },
  {
    name: "Giza",
    areas: ["6th of October City", "Sheikh Zayed City", "Haram"],
  },
  {
    name: "Ismailia",
    areas: ["Ismailia City", "Fayed", "Abu Sultan"],
  },
  {
    name: "Kafr El Sheikh",
    areas: ["Kafr El Sheikh City", "Desouk", "Baltim"],
  },
  {
    name: "Luxor",
    areas: ["Luxor City", "Karnak", "West Bank"],
  },
  {
    name: "Matrouh",
    areas: ["Marsa Matrouh", "Alamein", "Dabaa"],
  },
  {
    name: "Minya",
    areas: ["Minya City", "Mallawi", "Maghagha"],
  },
  {
    name: "Monufia",
    areas: ["Shibin El Kom", "Ashmoun", "Sadat City"],
  },
  {
    name: "New Valley",
    areas: ["Kharga Oasis", "Dakhla Oasis", "Farafra Oasis"],
  },
  {
    name: "North Sinai",
    areas: ["Al-Arish", "Sheikh Zuweid", "Rafah"],
  },
  {
    name: "Port Said",
    areas: ["Port Fouad", "East Port Said", "West Port Said"],
  },
  {
    name: "Qalyubia",
    areas: ["Banha", "Qalyub", "Shubra El Kheima"],
  },
  {
    name: "Qena",
    areas: ["Qena City", "Naga Hammadi", "Luxor East Bank"],
  },
  {
    name: "Red Sea",
    areas: ["Hurghada", "Marsa Alam", "El Gouna"],
  },
  {
    name: "Sharqia",
    areas: ["Zagazig", "Belbeis", "El Husseiniya"],
  },
  {
    name: "Sohag",
    areas: ["Sohag City", "Akhmim", "Girga"],
  },
  {
    name: "South Sinai",
    areas: ["Sharm El Sheikh", "Dahab", "Nuweiba"],
  },
  {
    name: "Suez",
    areas: ["Suez City", "Ataqah", "Ras Gharib"],
  },
];
function DeliveryDetailsForm({ setDeliveryConfirm }) {
  const [openModal, setOpenModal] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [addressData, setAddressData] = useState({});
  const [loading, setLoading] = useState(true);
  const [pickUpStation, setPickUpStation] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState("express");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const { locale } = useRouter();
  // const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("order");

  // Fetch initial data
  useEffect(() => {
    fetchData();
    fetchCartProducts(auth.currentUser, setCartProducts);
  }, []);

  // Fetch user data and set state
  const fetchData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const orderDetailsRef = collection(firestore, "order-details");
        const q = query(orderDetailsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setAddressData(data);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle city change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea("");
  };

  // Handle area change
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  // Handle delivery option change
  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  // Handle Modal submission
  const handleSubmit = () => {
    const updatedDeliveryOption = selectedCity ? "pick-up" : "express";
    setDeliveryOption(updatedDeliveryOption);
    setPickUpStation(
      selectedCity ? { city: selectedCity, area: selectedArea } : null
    );
    setOpenModal(false);
  };

  // Cancel modal
  const cancel = () => {
    setOpenModal(false);
  };

  // Navigate to payment page
  const goToPayment = async () => {
    let updatedData;
    const orderDetailsRef = collection(firestore, "order-details");
    const q = query(
      orderDetailsRef,
      where("userId", "==", auth.currentUser.uid)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        if (deliveryOption == "pick-up") {
          updatedData = {
            ...docData,
            deliveryMethod: deliveryOption,
            pickUpStation: pickUpStation,
          }; // You can set the default method here
        } else {
          updatedData = {
            ...docData,
            deliveryMethod: deliveryOption,
          };
        }
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, updatedData);
      }
      setDeliveryConfirm(true);
      router.push("/checkout_layout/payment-methods");
    } catch (error) {
      console.log("Error navigating to payment:", error);
    }
  };
  return (
    <>
      <Card className="mt-3 p-6">
        <ListHeader value={t("DELEVRIY DETAILS")} />
        <div>
          <div className="flex justify-between">
            <div className="flex items-start h-5">
              <div>
                <input
                  id="Pick-up"
                  aria-describedby="door-delivery-text"
                  type="radio"
                  value="pick-up"
                  name="delivery-option"
                  checked={deliveryOption === "pick-up"}
                  onChange={handleDeliveryOptionChange}
                  className="w-4 h-4 text-orange-500  border-orange-300 focus:text-orange-500  focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ms-2 text-sm">
                <label
                  htmlFor="helper-radio"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  <span className="font-semibold ">{t("Pick-up station")}</span>
                  <span>({t("from EGP")} 20.00)</span>
                </label>
                <p
                  id="helper-radio-text"
                  className="text-xs font-normal text-gray-500 dark:text-gray-300"
                >
                  {t("Delivery in three days")}
                </p>
              </div>
            </div>
            <div>
              <VolunteerActivismIcon className="text-orange-500" />
            </div>
          </div>
        </div>
        <Card className="p-6 my-5 border rounded-none " shadow={false}>
          <div className=" flex justify-between ">
            <span className="text-sm">{t("Pickup Station")}</span>
            <Link
              href={""}
              className="text-blue-900 mt-2 flex justify-start items-center"
              onClick={() => setOpenModal(true)}
            >
              <ArrowBackIosNewIcon className="text-sm me-1" />
              <span className="hover:underline">
                {t("Select pickup station")}
              </span>
            </Link>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header>
                {t("Select a Pick-up station close to you")}
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <div className="grid grid-cols-2 gap-4 p-0">
                      <div className="   ">
                        <Label htmlFor="citySelect">{t("Select City:")}</Label>
                        <Select
                          id="citySelect"
                          value={selectedCity}
                          onChange={handleCityChange}
                        >
                          <option value="">Select City</option>
                          {egyptGovernorates.map((governorate) => (
                            <option
                              key={governorate.name}
                              value={governorate.name}
                            >
                              {governorate.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className="  mb-4 ">
                        {" "}
                        <Label htmlFor="areaSelect">{t("Select Area:")}</Label>
                        <Select
                          id="areaSelect"
                          value={selectedArea}
                          onChange={handleAreaChange}
                        >
                          <option value="">Select Area</option>
                          {selectedCity &&
                            egyptGovernorates
                              .find(
                                (governorate) =>
                                  governorate.name === selectedCity
                              )
                              .areas.map((area) => (
                                <option key={area} value={area}>
                                  {area}
                                </option>
                              ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <SaveButton
                  handleSubmit={handleSubmit}
                  label={t("SAVE")}
                  color="amber"
                />
                <CancelButton handleSubmit={cancel} label={t("CANCEL")} />
              </Modal.Footer>
            </Modal>
          </div>
          <div className="flex justify-start items-center border rounded p-3">
            <MapIcon className="me-4 text-orange-500" />
            <div>
              <p className="text-sm">
                {pickUpStation !== null && deliveryOption !== "express"
                  ? t("Your Pick-up station is:")
                  : t("No Pickup Station Selected")}
              </p>
              <p className="text-xs">
                {pickUpStation !== null && deliveryOption !== "express"
                  ? `${pickUpStation.city}: ${pickUpStation.area}`
                  : t(
                      "To use this option, you will need to add a pickup station near your location."
                    )}
              </p>
            </div>
          </div>
        </Card>
        <hr></hr>
        <div>
          <div className="flex justify-between my-5">
            <div className="flex items-start h-5">
              <div>
                <input
                  id="door-delivery"
                  aria-describedby="door-delivery-text"
                  type="radio"
                  value="express"
                  name="delivery-option"
                  checked={deliveryOption === "express"}
                  onChange={handleDeliveryOptionChange}
                  className="w-4 h-4 text-orange-500  border-orange-300 focus:text-orange-500  focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="ms-2 text-sm">
                <label
                  htmlFor="door-delivery"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  <span className="text-semi ">{t("Door delivery")}</span>
                  <span>({t("from EGP")} 35.00)</span>
                </label>
                <p
                  id="helper-radio-text"
                  className="text-xs font-normal text-gray-500 dark:text-gray-300"
                >
                  {t("Delivery in three days")}
                </p>
              </div>
            </div>
            <div>
              <LocalShippingIcon className="text-orange-500" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 pb-2">
          <span className="text-sm  text-black dark:text-gray-300">
            {t("Shipment 1 / 1")}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-300">
            {t("Fulfilled by Dream2000 EG Marketplace")}
          </span>
        </div>
        <Card className="p-6 mb-2 border rounded-none " shadow={false}>
          <div>
            <p className="text-sm font-semibold">
              {deliveryOption == "express"
                ? t("Door Delivery")
                : deliveryOption == "pick-up"
                ? t("Pick-up Station")
                : ""}
            </p>
            <p className="text-xs">{t("Delivery in three days")}</p>
          </div>
          {cartProducts.map((cartProduct, index) => {
            return (
              <div key={index}>
                <hr></hr>
                <div className="flex justify-start items-center py-2 ">
                  <div>
                    <Image
                      src={cartProduct.product.thumbnail}
                      width={80}
                      height={80}
                      alt="product photo"
                    />
                  </div>
                  <div className="ps-4">
                    <p className="text-sm">
                      {locale == "en"
                        ? cartProduct.product.en.title
                        : cartProduct.product.ar.title}
                    </p>
                    <p className="text-xs">
                      {t("QTY")}: {cartProduct.quantity}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
        <div className="flex jusitfy-start">
          <SaveButton
            label={t("CONFIRM DELIVERY DETAILS")}
            color="amber"
            handleSubmit={goToPayment}
            disabled={!pickUpStation && deliveryOption === "pick-up"}
          />
        </div>
      </Card>
    </>
  );
}

export default DeliveryDetailsForm;
