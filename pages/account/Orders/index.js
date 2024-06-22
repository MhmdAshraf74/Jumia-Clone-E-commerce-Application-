import { AccountPageLayout } from "@/layouts/AccountLayout";
import MySpinner from "@/components/order/Spiner/Spinner";
import { auth, fetchOrderDetails, getOrderSubcollection } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
function Orders() {
  const [orderData, setOrderData] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("common", "account", "nav");
  const { locale } = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          // Fetch data from both functions concurrently using Promise.all
          const [orderDetails, orderSubcollection] = await Promise.all([
            fetchOrderDetails(user.uid),
            getOrderSubcollection(user.uid),
          ]);
          // Set the fetched data in state
          setOrderDetails(orderDetails);
          setOrderData(orderSubcollection);
          setLoading(false); // Set loading state to false
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MySpinner />
      </div>
    );
  } else {
    return (
      <>
        {orderData.length ? (
          <div>
            <h2 className="py-2 border-b px-4">{t("ORDERS")}</h2>
            <div className="py-4 h-[80%]">
              <div className=" border-b py-2  flex flex-col md:flex-row">
                <Link
                  className="px-4 hover:text-orange-400 mb-2 md:mb-0 "
                  href="/account/Orders"
                >
                  {t("Your Orders")} ({orderData ? orderData.length : ""})
                </Link>
              </div>

              {orderData.map((order, index) => {
                return (
                  <div key={index} className=" p-3 border my-2 ">
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/account/Orders/${user.uid}/${order.id}`}
                        className="text-amber-500  rounded-md py-1 px-2  uppercase hover:bg-red-200"
                      >
                        {t("SEE DETAILS")}
                      </Link>
                    </div>
                    {order.items.map((item, index) => {
                      return (
                        <>
                          <div key={item.product.prodId}>
                            <div className="flex justify-between items-start p-3 border-b my-2 flex-col md:flex-row">
                              <img
                                src={item.product.thumbnail}
                                width={100}
                                height={100}
                                className="p-2"
                              />
                              <div className="flex-1 p-2 ">
                                <p className="font-semibold text-lg py-1">
                                  {locale == "en"
                                    ? item.product.en.title
                                    : item.product.ar.title}
                                </p>
                                <p
                                  className={`text-black ${
                                    order.status === "order-placed"
                                      ? "bg-blue-800"
                                      : order.status === "deliverd"
                                      ? "bg-green-700"
                                      : order.status === "Cancelled"
                                      ? "bg-red-500"
                                      : "bg-blue-500"
                                  }w-fit py-1 px-2 rounded-md text-sm`}
                                >
                                  {t(order.status)}
                                </p>
                                <p className="py-1 text-sm text-gray-500">
                                  {t("delivered in three days")}
                                </p>
                              </div>
                              <div className="p-2"></div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className=" text-center py-8 h-[100%]">
            <h2 className="py-2">You have placed no orders yet!</h2>
            <p className="py-2">
              All your orders will be saved here for you to access their state
              anytime.
            </p>
            <Link
              href="/"
              className="btn my-6 p-4 bg-amber-500 hover:bg-yellow-400 text-white"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        )}
      </>
    );
  }
}

export default Orders;
Orders.getLayout = AccountPageLayout;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "account", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
