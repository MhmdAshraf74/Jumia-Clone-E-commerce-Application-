import { Badge } from "@material-tailwind/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { auth, firestore } from "@/firebase";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useTranslation } from "next-i18next";

export default function Shoppingcart() {
  const [cartLength, setCartLength] = useState(0);
  const { t } = useTranslation("nav");
  let productsFromLocalSorage;
  if (typeof window !== "undefined") {
    productsFromLocalSorage = JSON.parse(localStorage.getItem("cart"));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(firestore, "cart", user.uid), (snapShot) => {
          setCartLength(snapShot.data()?.products.length);
        });
      } else {
        setCartLength(productsFromLocalSorage?.length);
      }
    });
  }, [productsFromLocalSorage?.length]);
  return (
    <Link href="/cart" className="flex items-center">
      <Badge color="orange" content={cartLength || ""}>
        <ShoppingCartOutlinedIcon className="h-12 text-3xl font-bold" />
      </Badge>
      <span className="font-bold">{t("Cart")}</span>
    </Link>
  );
}
