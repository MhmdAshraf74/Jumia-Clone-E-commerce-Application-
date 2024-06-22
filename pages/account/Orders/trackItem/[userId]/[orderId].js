// "use client";

import { Timeline } from "flowbite-react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { AccountPageLayout } from "@/layouts/AccountLayout";
import { getOrderById } from "@/firebase";
import { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MySpinner from "@/components/order/Spiner/Spinner";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export const getServerSideProps = async ({ params, locale }) => {
  const { orderId, userId } = params;
  try {
    const orderObject = await getOrderById(userId, orderId);
    const translations = await serverSideTranslations(locale, [
      "common",
      "account",
      "nav",
    ]);
    return {
      props: { ...translations, orderObject },
    };
  } catch (e) {
    console.log("the error is :" + e);
    return {
      props: { product: null },
    };
  }
};
function TrackItem({ orderObject }) {
  const [orderDetails, setOrderDetails] = useState();
  const { t } = useTranslation("common", "account", "nav");

  if (orderObject) {
    return (
      <div className="p-4">
        <Link href={`/account/Orders`}>
          <header className="flex items-center py-2">
            <KeyboardBackspaceIcon className="me-2" />
            <span className="text-xl font-bold">{t("Order History")}</span>
          </header>
        </Link>
        <hr></hr>
        <br></br>
        {orderObject.status === "Cancelled" ? (
          <CancelledOrder time={orderObject.timestamp} />
        ) : (
          <Timeline>
            <>
              <Timeline.Item>
                <Timeline.Content>
                  <Timeline.Point icon={FiberManualRecordIcon} />
                  <Timeline.Title
                    className={`text-white font-normal text-sm px-3 py-1 ${
                      orderObject.status === "order-placed"
                        ? "bg-blue-900"
                        : " bg-gray-200"
                    }  w-fit rounded-lg`}
                  >
                    {t("Order Palced")}
                  </Timeline.Title>
                  <Timeline.Time>{orderObject.timestamp}</Timeline.Time>
                  <Timeline.Body>{t("order placed")}</Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            </>
            <Timeline.Item>
              <Timeline.Point icon={FiberManualRecordIcon} />
              <Timeline.Content>
                <Timeline.Title
                  className={`text-white font-normal text-sm px-3 py-1 ${
                    orderObject.status === "pending-confirmation"
                      ? "bg-blue-900"
                      : " bg-gray-200"
                  }  w-fit rounded-lg`}
                >
                  {t("pending confirmation")}
                </Timeline.Title>
                <Timeline.Time>{orderObject.timestamp}</Timeline.Time>
                <Timeline.Body>
                  {orderObject.status === "pending-confirmation"
                    ? t(
                        "Your order is currently being processed, and we will notify you once the item has been shipped."
                      )
                    : orderObject.status === "shipped" ||
                      orderObject.status === "out-for-delivery" ||
                      orderObject.status === "deliverd"
                    ? t("confirmed")
                    : ""}
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={FiberManualRecordIcon} />
              <Timeline.Content>
                <Timeline.Title
                  className={`text-white font-normal text-sm px-3 py-1 ${
                    orderObject.status === "shipped"
                      ? "bg-blue-900"
                      : " bg-gray-200"
                  }  w-fit rounded-lg`}
                >
                  {t("Shipped")}
                </Timeline.Title>
                <Timeline.Time></Timeline.Time>
                <Timeline.Body>
                  {orderObject.status === "shipped"
                    ? t(
                        "Your order is currently being shipped, and we will notify you once the item is out for delivery."
                      )
                    : orderObject.status === "out-for-delivery" ||
                      orderObject.status === "deliverd"
                    ? t("shipped")
                    : ""}
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={FiberManualRecordIcon} />
              <Timeline.Content>
                <Timeline.Title
                  className={`text-white font-normal text-sm px-3 py-1 ${
                    orderObject.status === "out-for-delivery"
                      ? "bg-blue-900"
                      : " bg-gray-200"
                  }  w-fit rounded-lg`}
                >
                  {t("out for delivery")}
                </Timeline.Title>
                <Timeline.Time></Timeline.Time>
                <Timeline.Body>
                  {orderObject.status === "out-for-delivery"
                    ? t("Your order is currently out for delivery.")
                    : orderObject.status === "deliverd"
                    ? t("delivered")
                    : ""}
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={FiberManualRecordIcon} />
              <Timeline.Content>
                <Timeline.Title
                  className={`text-white font-normal text-sm px-3 py-1 ${
                    orderObject.status === "delivered"
                      ? "bg-blue-300"
                      : " bg-gray-200"
                  }  w-fit rounded-lg`}
                >
                  {t("delivered")}
                </Timeline.Title>
                <Timeline.Time></Timeline.Time>
                <Timeline.Body>
                  {orderObject.status === "delivered"
                    ? t("Your order is deliverd successfully.")
                    : ""}
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <MySpinner />
      </div>
    );
  }
}

export default TrackItem;
TrackItem.getLayout = AccountPageLayout;

function CancelledOrder({ time }) {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Content>
          <Timeline.Point icon={FiberManualRecordIcon} />
          <Timeline.Title
            className="text-white font-normal text-sm px-3 py-1 
        bg-red-500
        w-fit rounded-lg"
          >
            Cancelled
          </Timeline.Title>
          <Timeline.Time>{time}</Timeline.Time>
          <Timeline.Body>Cancelled</Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  );
}
