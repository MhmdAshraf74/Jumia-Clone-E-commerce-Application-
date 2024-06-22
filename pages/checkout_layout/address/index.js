"use client";
import Delivery from "@/components/order/DeliveryDetails/Delivery";
import EditAdressForm from "@/components/order/EditAdressForm/EditAdressForm";
import PaymentMethod from "@/components/order/PaymentMethod/PaymentMethod";
import { CheckPageLayout } from "../../../layouts/checkoutLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
function Adress({ setAddressConfirm }) {
  return (
    <>
      <div>
        <EditAdressForm setAddressConfirm={setAddressConfirm} />
      </div>
      <div className="text-grey-100">
        <Delivery />
      </div>
      <div className="text-grey-100">
        <PaymentMethod />
      </div>
    </>
  );
}

export default Adress;
Adress.getLayout = CheckPageLayout;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "order"])),
      // Will be passed to the page component as props
    },
  };
}
