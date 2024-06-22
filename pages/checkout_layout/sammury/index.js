import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  onSnapshot,
} from "firebase/firestore";
import {
  auth,
  fetchCartProducts,
  firestore,
  getCartproducts,
} from "../../../firebase";
// import { Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import MySpinner from "@/components/order/Spiner/Spinner";
import ListHeader from "@/components/order/ListHeader/ListHeader";
import CustomerAdress from "@/components/order/customeradress/customeraddress";
import { CheckPageLayout } from "../../../layouts/checkoutLayout";
import { Card } from "@material-tailwind/react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

function Summery({ setPaymentConfirm, setAddressConfirm, setDeliveryConfirm }) {
  const [addressData, setAddressData] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation("order");
  const { locale, push } = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      getData(user);
      fetchCartProducts(user, setCartProducts);
    });
  }, []);

  async function getData(user) {
    try {
      if (user) {
        const orderDetailsRef = collection(firestore, "order-details");
        const q = query(orderDetailsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setAddressData(data);
        } else {
          setError("No data found for this user.");
        }
      } else {
        setError("No user found.");
        alert("You shoud login first");
        push("/identification");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MySpinner />
      </div>
    );
  } else {
    return (
      <>
        <section className="bg-[#e5e5e580]">
          <Card className="p-6">
            <div className="flex justify-between items-center">
              <ListHeader value={t("CUSTOMER ADRESS")} color="text-green-900" />
              <button
                onClick={() => {
                  setAddressConfirm(false);
                  router.push("/checkout_layout/address");
                }}
              >
                <span className="ms-2 text-blue-900 hover:underline">
                  {t("Change")}
                </span>
              </button>
            </div>
            {addressData && addressData.shippingAddress ? (
              <CustomerAdress
                title={`${addressData.shippingAddress.firstName} ${addressData.shippingAddress.lastName}`}
                info={`${addressData.shippingAddress.region} | ${addressData.shippingAddress.city} | ${addressData.shippingAddress.address} | ${addressData.shippingAddress.additionalInfo}`}
              />
            ) : (
              <MySpinner />
            )}
          </Card>
          <Card className="mt-3 p-6">
            <div className="flex justify-between items-center">
              <ListHeader
                value={t("DELIVERY DETAILS")}
                color="text-green-900"
              />
              <button
                onClick={() => {
                  setDeliveryConfirm(false);
                  router.push("/checkout_layout/shipping-options");
                }}
              >
                <span className="ms-2 text-blue-900 hover:underline">
                  {t("Change")}
                </span>
              </button>
            </div>
            {addressData ? (
              <CustomerAdress
                title={
                  addressData.deliveryMethod == "express"
                    ? t("Door Delivery")
                    : t("Pick-up Station")
                }
                info={t("Delivery in three days")}
              />
            ) : (
              <MySpinner />
            )}
            <div className="flex justify-between items-center pt-3">
              <span className="text-sm font-semibold text-black dark:text-gray-300">
                {t("Shipment 1 / 1")}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {t("Fulfilled by Dream2000 EG Marketplace")}
              </span>
            </div>
            <Card className="p-6 border rounded-none" shadow={false}>
              <div>
                <p className="text-sm">
                  {addressData.deliveryMethod == "express"
                    ? t("Door Delivery")
                    : t("Pick-up Station")}
                </p>
                <p className="text-xs">{t("Delivery in three days")}</p>
              </div>
              {cartProducts.map((cartProduct, index) => {
                return (
                  <div key={index}>
                    <hr></hr>
                    <div className="flex justify-start items-center py-2 ">
                      <div>
                        <img
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
          </Card>

          <div className="text-grey-100 pt-3">
            <Card className="p-6">
              <div className="flex justify-between items-center">
                <ListHeader
                  value={t("PAYMENT METHOD")}
                  color="text-green-900"
                />
                <button
                  onClick={() => {
                    setPaymentConfirm(false);
                    router.push("/checkout_layout/payment-methods");
                  }}
                >
                  <span className="ms-2 text-blue-900 hover:underline">
                    {t("Change")}
                  </span>
                </button>
              </div>
              {addressData ? (
                <CustomerAdress
                  title={
                    addressData.paymentMethod == "cash"
                      ? t("Cash on delivery")
                      : t("Pay with card")
                  }
                  info={t("Delivery in three days")}
                />
              ) : (
                <MySpinner />
              )}
            </Card>
          </div>
        </section>
      </>
    );
  }
}

export default Summery;
Summery.getLayout = CheckPageLayout;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "order"])),
      // Will be passed to the page component as props
    },
  };
}
