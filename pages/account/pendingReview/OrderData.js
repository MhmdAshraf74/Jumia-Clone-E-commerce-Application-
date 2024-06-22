import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import Order from "../../../components/DeliveredOrder/Order";
import NoOrders from "../../../components/NoOrders/NoOrders";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "account", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
export default function OrderData({ userOrders }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Initially set to loading
  const { t } = useTranslation("account");
  useEffect(() => {
    // Set isLoading to false when userOrders is received
    if (userOrders && userOrders.length > 0) {
      setIsLoading(false);
    }
  }, [userOrders]);

  return (
    <div className="box-border h-[100%]">
      <header className="py-2 px-4">
        <div className="flex items-center border-b">
          <ArrowBackIcon
            className="mr-2 cursor-pointer hover:text-gray-500"
            onClick={() => router.back()}
          />
          <h2 className="py-2">{t("Pending Reviews")}</h2>
        </div>
      </header>
      {isLoading ? (
        // Show loading indicator if isLoading is true
        <div className="flex justify-center items-center h-full">
          <p>{t("Loading...")}</p>
        </div>
      ) : (
        <div className="gap-5 flex flex-col flex-wrap items-stretch text-center py-8 h-[100%]">
          {userOrders.map((order, index) => {
            if (order.status === "delivered" && !order.review) {
              return <Order order={order} key={index} />;
            }
            return null; // Otherwise, return null to skip rendering
          })}
          {/* Render NoOrders component if there are no matching orders */}
          {userOrders.every(
            (order) => !(order.status === "delivered" && !order.review)
          ) && <NoOrders />}
        </div>
      )}
    </div>
  );
}
