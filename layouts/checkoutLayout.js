import Link from "next/link";
import MyNavbar from "../components/order/navbar/navbar";
import ProccedToBuy from "../components/order/proccedToBuy/ProccedToBuy";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/firebase";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import MySpinner from "@/components/order/Spiner/Spinner";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import LangToggel from "@/components/langToggel/LangToggel";
function CheckoutLayout({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [userState, setUserState] = useState(null);
  const [isCard, setIsCard] = useState(true);
  const [adressConfirm, setAddressConfirm] = useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [deliveryConfirm, setDeliveryConfirm] = useState(false);
  const { t } = useTranslation("order");
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(user);
        const unsubscribeSnapshot = onSnapshot(
          doc(firestore, "cart", user.uid),
          (snapShot) => {
            setCartProducts(snapShot.data()?.products || []);
          }
        );
        return () => unsubscribeSnapshot();
      } else {
        const productsFromLocalStorage = JSON.parse(
          localStorage.getItem("cart")
        );
        setCartProducts(productsFromLocalStorage || []);
        alert("You shoud login first");
        router.push("/identification");
      }
    });
    return () => unsubscribe();
  }, []);
  if (cartProducts === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MySpinner />
      </div>
    );
  } else {
    return (
      <>
        <section className="min-h-screen">
          <LangToggel />
          <MyNavbar />
          <section className="container mx-auto  grid grid-cols-12 gap-6 ">
            <section className=" col-span-12 md:col-span-8 lg:col-span-9  p-0 ">
              <div>
                {" "}
                {/* Pass cartProducts as props to children */}
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                      setIsCard: setIsCard,
                      setDeliveryConfirm: setDeliveryConfirm,
                      setPaymentConfirm: setPaymentConfirm,
                      setAddressConfirm: setAddressConfirm,
                    });
                  }
                  return child;
                })}
              </div>
            </section>
            <div className="col-span-12 md:col-span-4  lg:col-span-3">
              <ProccedToBuy
                cartProducts={cartProducts}
                isCard={isCard}
                adressConfirm={adressConfirm}
                deliveryConfirm={deliveryConfirm}
                paymentConfirm={paymentConfirm}
              />
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
              <Link
                href={"/"}
                className="text-blue-900 mt-2 flex justify-start items-center"
              >
                <ArrowBackIosNewIcon className="text-sm me-1" />
                <span className="hover:underline">
                  {t("Go back & continue shopping")}
                </span>
              </Link>
            </div>
          </section>
        </section>
      </>
    );
  }
}

export default CheckoutLayout;
export const CheckPageLayout = (page) => (
  <CheckoutLayout>{page}</CheckoutLayout>
);
CheckoutLayout.getLayout = CheckPageLayout;
