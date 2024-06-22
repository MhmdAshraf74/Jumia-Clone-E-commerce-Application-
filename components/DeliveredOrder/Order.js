import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function Order({ order }) {
  const { t } = useTranslation("account");
  const { locale } = useRouter();
  return (
    <>
      <div className="flex flex-col  md:flex-row border rounded-lg p-3">
        <div>
          <img
            src={order.items[0].product.thumbnail}
            alt="Product Image"
            className="mr-4 h-20"
          />
        </div>
        <div className="flex flex-col mr-4 text-start flex-1">
          <p>
            {locale == "en"
              ? order.items[0].product.en.title
              : order.items[0].product.ar.title}
          </p>
          <small className="text-gray-400 mb-2">
            {t("order")} {order.items[0].product.proId}
          </small>
          <span className="bg-green-500 text-xs min-h-4 rounded text-white w-fit px-2 mb-2">
            {t("Delivered")}
          </span>
          <p>
            {t("on")} {order.timestamp}
          </p>
        </div>
        <Link href={`/account/Review/${order.items[0].product.proId}`}>
          <Button variant="text" color="warning" className="flex  h-fit">
            {t("Review")}
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Order;
