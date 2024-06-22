import { Card } from "@material-tailwind/react";
import SaveButton from "../Save_button/SaveButton";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
function ProccedToBuy({
  cartProducts,
  isCard,
  paymentConfirm,
  deliveryConfirm,
  adressConfirm,
}) {
  console.log(isCard);
  let paymentMethod;
  if (isCard == true) {
    paymentMethod = "card";
  } else {
    paymentMethod = "cash";
  }
  console.log(cartProducts);
  const router = useRouter();
  const { t } = useTranslation("order");

  let timeStamp = Timestamp.now();
  let jsDate = timeStamp.toDate();
  let orderDate = `${jsDate.getDate()} / ${
    jsDate.getMonth() + 1
  } / ${jsDate.getFullYear()}`;
  let total = Number();
  async function handleSubmit() {
    const orderDetailsRef = collection(firestore, "order-details");
    const q = query(
      orderDetailsRef,
      where("userId", "==", auth.currentUser.uid)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const docData = querySnapshot.docs[0].data();
        if (docData.deliveryMethod && docData.shippingAddress) {
          const orderSubcollectionRef = collection(docRef, "orders");
          const newOrderDocRef = await addDoc(orderSubcollectionRef, {
            items: cartProducts,
            timestamp: orderDate,
            status: "order-placed",
            paymentMethod: paymentMethod,
            confirmed: true,
          });
          console.log("New order document added with ID: ", newOrderDocRef.id);
          await updateDoc(docRef, {
            ...docData,
          });
          alert("Your order has been completed");
          if (isCard === true) {
            router.push("/paypal");
          } else {
            router.push("/account/Orders");
          }
        } else {
          alert(
            "Your order has not been completed,Please complete your information"
          );
          await updateDoc(docRef, {
            ...docData,
            confirmed: false,
          });
        }
        return;
      }
    } catch (error) {
      console.log("Error navigating to payment:", error);
    }
  }
  console.log(paymentConfirm, deliveryConfirm, adressConfirm);
  return (
    <>
      <Card className="p-6">
        <div>
          <h5 className=" border-b-2 py-1 font-semibold text-sm ">
            {t("Order summary")}
          </h5>
          <div className=" border-b-2 py-1 text-sm">
            <div className="flex flex-row justify-between items-center py-1  ">
              <p className="">
                {t("Items total")} ({cartProducts.length})
              </p>
              <p className="font-semibold  ">
                {cartProducts.map((product, index) => {
                  total += product.product?.price * product.quantity;
                })}
                {t("EGP")} {total}
              </p>
            </div>
            <div className="flex flex-row justify-between items-center py-1 ">
              <span>{t("Delivery fees")}</span>
              <span className="font-semibold ">{t("EGP")} 35</span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center py-2">
            <span className="text-sm capitalize  font-medium">
              {t("total")}
            </span>
            <span className="text-xl">
              {t("EGP")} {total}
            </span>
          </div>
          <div>
            <SaveButton
              label={t("CONFIRM ORDER")}
              handleSubmit={handleSubmit}
              color="amber"
              disabled={
                paymentConfirm == true &&
                deliveryConfirm == true &&
                adressConfirm == true
                  ? ""
                  : "disabled"
              }
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export default ProccedToBuy;
