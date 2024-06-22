import React, { useEffect, useState } from "react";
import { getProductsByCategoryId } from "../../firebase";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Breadcrumbs } from "@material-tailwind/react";
import CatProdList from "@/components/CatProdList/CatProdList";
import MySpinner from "@/components/order/Spiner/Spinner";
import { catIds } from "@/data";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
export default function Perfumes() {
  const [loading, setLoading] = useState(true);
  const [catProducts, setCatProducts] = useState([]);
  const { t } = useTranslation("common", "nav");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductsByCategoryId(catIds.Perfumes);
        setCatProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MySpinner />
      </div>
    );
  } else {
    return (
      <main className="container mx-auto">
        <Breadcrumbs separator="/">
          <Link href="/" className="opacity-60">
            {t("Home")}
          </Link>
          <Link href="/category/perfumes">{t("Perfumes")}</Link>
        </Breadcrumbs>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12   md:col-span-3">
            <Sidebar
              catData="Perfumes"
              setCatProducts={setCatProducts}
              id={catIds.Perfumes}
            />
            ;
          </div>
          <div className=" col-span-12 md:col-span-9 ">
            <CatProdList catProducts={catProducts} catData="Perfumes" />
          </div>
        </div>
      </main>
    );
  }
}
