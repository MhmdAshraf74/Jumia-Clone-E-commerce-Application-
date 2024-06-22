import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore, auth } from "../../../firebase"; // Assuming you have access to auth
import OrderData from "./OrderData";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AccountPageLayout } from "@/layouts/AccountLayout";

export default function PendingReviews() {
  const [userOrders, setUserOrders] = useState([]);
  const { t } = useTranslation("account");
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const orderDetailsSnapshot = await getDocs(
          collection(firestore, "order-details")
        );
        const userOrdersPromises = orderDetailsSnapshot.docs.map(
          async (orderDoc) => {
            const userID = orderDoc.data().userId;
            if (userID === auth.currentUser.uid) {
              const ordersSnapshot = await getDocs(
                collection(orderDoc.ref, "orders")
              );
              return ordersSnapshot.docs.map((doc) => doc.data());
            }
            return [];
          }
        );
        const userOrdersData = await Promise.all(userOrdersPromises);
        const mergedOrdersData = userOrdersData.flat();
        setUserOrders(mergedOrdersData);
      } catch (err) {
        console.error("Error fetching order details:", err);
      }
    };
    fetchUserOrders();
  }, []);

  return <OrderData userOrders={userOrders} />;
}

PendingReviews.getLayout = AccountPageLayout;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "account", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
