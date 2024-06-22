import { Modal } from "flowbite-react";
import Link from "next/link";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ListHeader from "@/components/order/ListHeader/ListHeader";
import SaveButton from "@/components/order/Save_button/SaveButton";
import CustomerAdress from "@/components/order/customeradress/customeraddress";
import { CheckPageLayout } from "../../../layouts/checkoutLayout";
import { Card } from "@material-tailwind/react";
import { auth, firestore, getOrderDetailsData } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MySpinner from "@/components/order/Spiner/Spinner";
function ChoosePaymant({
  setIsCard,
  setPaymentConfirm,
  setAddressConfirm,
  setDeliveryConfirm,
}) {
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setError] = useState("");
  const router = useRouter();
  const { t } = useTranslation("order");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      getData(user);
    });
  });
  if (paymentMethod === "card") {
    setIsCard(true);
  } else {
    setIsCard(false);
  }
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
        router.push("/identification");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }
  console.log(addressData);
  // Handle Payment Method change
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    console.log(paymentMethod);
  };
  const handleSubmit = () => setOpenModal(false);
  const goToSammry = async () => {
    router.push("/checkout_layout/sammury");
    setPaymentConfirm(true);
  };
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
          <div className="flex justify-between items-center ">
            <ListHeader value={t("DELIVERY OPTIONS")} color="text-green-900" />
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
              info="Delivery Sheduled on 30 March"
            />
          ) : (
            <MySpinner />
          )}
        </Card>

        <div className="text-grey-100">
          {" "}
          <Card className="mt-3 p-6">
            <ListHeader value={t("PAYMENT METHOD")} />
            <hr></hr>
            <div>
              <h2 className="py-3 font-bold">{t("Payment on delivery")}</h2>
              <div className="flex justify-between">
                <div className="flex items-start ">
                  <div>
                    <input
                      id="cash"
                      aria-describedby="helper-radio-text"
                      type="radio"
                      value="cash"
                      name="payment-method"
                      checked={paymentMethod === "cash"}
                      onChange={handlePaymentMethodChange}
                      className="w-4 h-4 text-orange-500  border-orange-300 focus:text-orange-500  focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="ms-2 text-sm ">
                    <label
                      htmlFor="helper-radio"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      <span className="font-semibold ">
                        {t("Cash On Delivery")}
                      </span>
                    </label>
                    <p
                      id="helper-radio-text"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      {t(
                        "For more secure and contactless delivery and to get 10 EGP discount we recommend using Pay by Card"
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <MonetizationOnIcon className="text-orange-500" />
                </div>
              </div>
            </div>
            <Card className="p-6 my-5">
              {/* <div className=" flex justify-between "> </div> */}
              <div className="flex justify-start items-center border rounded p-2">
                <div>
                  <p className="text-sm">
                    -
                    {t(
                      "When you choose Cash on delivery, you can pay for your order in cash when you receive your shipment at home or"
                    )}
                    {t("shipment at home or Jumia’s pick-up stations.")}
                  </p>
                  <p className="text-sm">
                    -{" "}
                    {t(
                      "- Enjoy 10 EGP discount when you pay via prepaid method."
                    )}
                  </p>
                  <p className="text-xs">
                    <Link
                      href={""}
                      className="text-blue-900 mt-2 flex justify-start items-center"
                      onClick={() => setOpenModal(true)}
                    >
                      <span className="hover:underline">{t("Details")}</span>
                    </Link>
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                      <Modal.Header>{t("Cash on Delivery")}</Modal.Header>
                      <Modal.Body>
                        <div className="space-y-6">
                          <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <div className="">
                              -
                              {t(
                                "When you choose Cash on delivery, you can pay for your order in cash when you receive your shipment at home or"
                              )}
                              {t(
                                "shipment at home or Jumia’s pick-up stations."
                              )}
                              {t(
                                "- Enjoy 10 EGP discount when you pay via prepaid method."
                              )}
                              {t("- Egyptian pounds are accepted only.")}
                              {t(
                                "- Please provide the specified amount only when paying for the possibility that there will be enough cash with the delivery representative if a value is paid higher than the requested one. - You must pay for the product before opening the shipment."
                              )}
                              {t(
                                "- In case the product is returned, the available refund methods are (refund voucher -postal transfer)."
                              )}
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <SaveButton
                          handleSubmit={handleSubmit}
                          label={t("ACCEPT")}
                          color="amber"
                        />
                      </Modal.Footer>
                    </Modal>
                  </p>
                </div>
              </div>
            </Card>
            <hr></hr>
            <div className="mt-2">
              <div className="flex justify-between">
                <div className="flex items-start h-5">
                  <div>
                    <input
                      id="helper-radio"
                      aria-describedby="helper-radio-text"
                      type="radio"
                      value="card"
                      name="payment-method"
                      checked={paymentMethod === "card"}
                      onChange={handlePaymentMethodChange}
                      className="w-4 h-4 text-orange-500  border-orange-300 focus:text-orange-500  focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="ms-2 text-sm">
                    <label
                      htmlFor="helper-radio"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      <span className="text-semi ">{t("Pay by Card")}</span>
                    </label>
                    <p
                      id="helper-radio-text"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      {t(
                        "Get 10 EGP off on shipping fees when You pay with Your card"
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <LocalPoliceIcon className="text-orange-500" />
                </div>
              </div>
            </div>
            <div className="flex jusitfy-start mt-6">
              <SaveButton
                label="confirm Payment Details"
                color="amber"
                handleSubmit={goToSammry}
                disabled={!paymentMethod}
              />
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

export default ChoosePaymant;
ChoosePaymant.getLayout = CheckPageLayout;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "order"])),
      // Will be passed to the page component as props
    },
  };
}
