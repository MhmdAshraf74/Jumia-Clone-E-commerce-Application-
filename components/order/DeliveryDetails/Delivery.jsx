"use client";
import { Card } from "@material-tailwind/react";
import ListHeader from "../ListHeader/ListHeader";
import { useTranslation } from "next-i18next";
function Delivery() {
  const { t } = useTranslation("order");
  return (
    <div>
      <Card className="mt-2 p-6">
        <ListHeader value={t("2.DELIVERY DETAILS")} />
      </Card>
    </div>
  );
}
export default Delivery;
