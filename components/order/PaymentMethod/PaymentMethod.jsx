import { Card } from "@material-tailwind/react";
import ListHeader from "../ListHeader/ListHeader";
import { useTranslation } from "next-i18next";
// import { Card } from "flowbite-react";

function PaymentMethod() {
  const { t } = useTranslation("order");
  return (
    <div>
      <Card className="mt-2 p-6">
        <ListHeader value={t("3.PAYMENT METHOD")} />
      </Card>
    </div>
  );
}

export default PaymentMethod;
