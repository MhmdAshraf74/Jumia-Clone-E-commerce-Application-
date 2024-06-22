import Link from "next/link";
import React, { useState } from "react";
import EditOldAddress from "./EditOldAddress";
import AddNewAddress from "./AddNewAddress";
import { AccountPageLayout } from "@/layouts/AccountLayout";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MySpinner from "@/components/order/Spiner/Spinner";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "@/firebase";
function AddressBook() {
  const { t } = useTranslation("common");
  const [addressData, setAddressData] = useState(null);
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      fetchAndPopulateFormData(user.uid);
    });
  }, []);
  // Function to fetch existing data from Firestore and populate the form fields
  const fetchAndPopulateFormData = async (userId) => {
    const orderDetailsRef = collection(firestore, "order-details");
    const q = query(orderDetailsRef, where("userId", "==", userId));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        setAddressData(docData);
      }
    } catch (error) {
      console.error("Error fetching and populating form data: ", error);
    }
  };

  if (addressData === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MySpinner />
      </div>
    );
  } else {
    return (
      <>
        <div>
          <header className="py-2 px-4 border-b flex  justify-between items-center ">
            <h1 className="font-bold">{t("Address Book")}</h1>
          </header>
          <div>
            <div className=" p-2 flex w-[50%] box-border">
              <div className=" border   w-[100%] box-border">
                <article className="p-4 bg-rose-100">
                  <header className=" ">
                    <h2>{t("Address Details")}</h2>
                  </header>
                  <div>
                    <p className="pt-2 px-2">
                      {addressData.shippingAddress.region}
                    </p>
                    <p className="p-2 text-slate-300">
                      {addressData.shippingAddress.city}
                    </p>
                    <p className="p-2 text-slate-300">
                      {addressData.shippingAddress.additionalInfo}
                    </p>
                    <p className="mt-4 text-lime-600">{t("Default Address")}</p>
                  </div>
                </article>
                <div className="p-2  flex justify-between box-border">
                  <Link
                    href="/account/AddressBook/EditOldAddress"
                    className="hover:bg-amber-200 hover:rounded-full my-2 mx-2 p-2 "
                  >
                    <BorderColorIcon className="text-amber-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddressBook;
AddressBook.getLayout = AccountPageLayout;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "account",
        "order",
        "nav",
      ])),
      // Will be passed to the page component as props
    },
  };
}
