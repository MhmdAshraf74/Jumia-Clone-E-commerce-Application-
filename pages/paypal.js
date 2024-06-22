"use client";

import MySpinner from "@/components/order/Spiner/Spinner";
import { auth, firestore } from "@/firebase";
import { Alert } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}
function Paypal() {
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  let total = Number();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const unsubscribeSnapshot = onSnapshot(
            doc(firestore, "cart", user.uid),
            (snapShot) => {
              setCartProducts(snapShot.data()?.products || []);
              setLoading(true);
            }
          );
          return () => unsubscribeSnapshot();
        } else {
          const productsFromLocalStorage = JSON.parse(
            localStorage.getItem("cart")
          );
          setCartProducts(productsFromLocalStorage || []);
        }
        return () => unsubscribe();
      },
      []
    );
  });
  cartProducts.map((product, index) => {
    total += product.product?.price * product.quantity;
  });
  if (loading == true) {
    return (
      <>
        <div className="h-screen">
          {" "}
          <div className="bg-white min-h-[80]">
            <img
              src="https://www.egypttoday.com/siteimages/Larg/66802.jpg"
              width={120}
              height={80}
            />
          </div>
          {
            <div className="flex flex-col items-center justify-center ">
              <Alert
                icon={<CheckIcon />}
                className={
                  success
                    ? "rounded-none border-l-4 border-green-500 bg-green-500/10 font-medium text-green-500 my-8"
                    : "hidden"
                }
              >
                Your Payment has been done Successfully
              </Alert>
            </div>
          }
          <div className="grid h-[80%] ">
            <div className="container mx-auto ">
              <div className=" flex  flex-col items-center justify-center ">
                <div className=" min-w-[100%]  sm:min-w-[30rem]  ">
                  <p className="text-md uppercase my-3 text-gray-500">
                    order summary
                  </p>
                  <div className="w-full   h-fit my-1 bg-white px-4 py-3 overflow-hidden rounded-none border">
                    <span className="flex justify-between my-2 items-center">
                      <span className="uppercase font-bold uppercase text-lg">
                        total to pay
                      </span>
                      <span className="text-blue-500 text-sm font-bold ">
                        EGP {total}
                      </span>
                    </span>
                  </div>
                  <p className="text-md uppercase my-3 text-gray-500">
                    choose your Payment method
                  </p>
                  <PayPalScriptProvider
                    options={{
                      clientId:
                        "Abfv8kkW0QrUOwA_Yc0_zwxYqJAjW9wVbhHK1F5onkEH4xm1n5BJn01pifr-sMGB875gWv6hZWzQzl8i",
                    }}
                  >
                    <PayPalButtons
                      style={{
                        color: "gold",
                        layout: "vertical",
                        label: "pay",
                      }}
                      createOrder={async () => {
                        let ttotal = 300;
                        console.log(total);
                        console.log(ttotal);
                        const res = await fetch("/api/checkout", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ myTotal: total }),
                        });
                        const order = await res.json();
                        console.log(order);
                        return order.id;
                      }}
                      onApprove={(data, actions) => {
                        // return actions.order.capture().then(function (details) {
                        console.log(data);
                        setSuccess(true);
                        // });
                      }}
                      onCancel={(data, actions) => {
                        setCancelled(true);
                        console.log("canclled");
                        console.log(cancelled);
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
            <div className="self-end">
              <hr></hr>
              <div className="text-center w-full py-2">
                <Link className="uppercase text-blue-500" href="/">
                  back to jumia{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    <MySpinner />;
  }
}

export default Paypal;
export const PaymentPage = (page) => page;
Paypal.getLayout = PaymentPage;
