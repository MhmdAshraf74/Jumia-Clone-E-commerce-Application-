import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import logoExpress from "@/public/Logo-express.png";
import StarIcon from "@mui/icons-material/Star";
import { useAddToCart } from "@/services/addToCart";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Toast } from "../navbar";


function CatProdCard({ cardData }) {
  const toast = useSelector((state) => state.toast);
  const [addToCart] = useAddToCart();
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  

  return (
    <Card
      key={cardData.proId}
      className="items-between justify-between  shadow-none group hover:shadow-2xl"
    >
      {toast.value ? <Toast message={toast.message} /> : ""}
      <div className="flex items-center justify-center p-2">
        <img
          width={100}
          height={100}
          src={cardData.thumbnail}
          alt="product picture"
        />
      </div>
      <CardBody className="">
        <p className="mb-1"></p>
        <p className="font-medium">
          {" "}
          {locale == "en" ? cardData.en.title : cardData.ar.title}
        </p>
        <Typography className="flex">
          <span className="me-2  text-gray-500 font-normal text-xs">
            {cardData.price}
          </span>
        </Typography>
        <div className="flex items-center">
          <div className="flex">
            <StarIcon
              className={
                cardData.rating >= 1 ? "text-amber-500" : "text-grey-100"
              }
            />
            <StarIcon
              className={
                cardData.rating >= 2 ? "text-amber-500" : "text-grey-100"
              }
            />
            <StarIcon
              className={
                cardData.rating >= 3 ? "text-amber-500" : "text-grey-100"
              }
            />
            <StarIcon
              className={
                cardData.rating >= 4 ? "text-amber-500" : "text-grey-100"
              }
            />
            <StarIcon
              className={
                cardData.rating >= 5 ? "text-amber-500" : "text-grey-100"
              }
            />
          </div>
          <div className="mt-1 ms-1 text-sm font-medium text-gray-700 hover:text-gray-900 text-sm color-blue-900">
            {cardData.ratingQuantity}
          </div>
        </div>
        <Image width={120} height={120} src={logoExpress} alt="logo express" />
      </CardBody>
      <CardFooter className="flex">
        <Button
          className="  text-white invisible group-hover:visible"
          color="amber"
          fullWidth
          onClick={() => {
            addToCart(cardData);
          }}
        >
          {" "}
          {t("ADD TO CART")}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CatProdCard;
