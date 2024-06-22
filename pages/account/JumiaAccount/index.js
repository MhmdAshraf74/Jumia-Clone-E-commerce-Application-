import Link from "next/link";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/firebase";
import { AccountPageLayout } from "@/layouts/AccountLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { collection, getDocs, query, where } from "firebase/firestore";
import MySpinner from "@/components/order/Spiner/Spinner";
function Myaccount() {
  const { t } = useTranslation("common", "account", "nav");
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
        <main>
          <header className="border-b py-2 px-4">
            <h2>{t("Account Overview")}</h2>
          </header>
          <div className=" grid md:grid-cols-2 ">
            <div className="p-2">
              <div className=" border p-2 h-[100%]">
                <article>
                  <header className="border-b p-4">
                    {t("ACCOUNT DETAILS")}
                  </header>
                  {/* Get name and user email. */}
                  <div>
                    <p className="pt-2 px-2">{user?.displayName}</p>
                    <p className="p-2">{user?.email}</p>
                  </div>
                </article>
              </div>
            </div>
            <div className=" p-2">
              <div className=" border p-2  ">
                <div className="border-b p-4 flex justify-between ">
                  <h3 className="p-0 ">{t("ADDRESS BOOK")}</h3>
                  <Link
                    className="hover:bg-orange-200 hover:rounded-full mx-4 text-amber-500 "
                    href="/account/AddressBook/EditOldAddress"
                  >
                    <EditIcon />
                  </Link>
                </div>
                <div>
                  <h3 className="pt-2 px-2">
                    {t("Your default shipping address:")}
                  </h3>
                  <p className="p-2">{addressData.shippingAddress.region}</p>
                  <p className="p-2">{addressData.shippingAddress.city}</p>
                  <p className="p-2">
                    {addressData.shippingAddress.additionalInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Myaccount;
Myaccount.getLayout = AccountPageLayout;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "account", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
