import React, { useEffect, useState } from "react";
import { getProductsByCategoryId } from "../../firebase";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Breadcrumbs } from "@material-tailwind/react";
import SubCategories from "@/components/Product/subcategories";
import Header from "@/components/Product/header";
import Product from "@/components/Product/product";
import MySpinner from "@/components/order/Spiner/Spinner";
import CatProdList from "@/components/CatProdList/CatProdList";
import { catIds } from "@/data";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

export default function Watches() {
  const [loading, setLoading] = useState(true);
  const imageUrls = [
    "https://eg.jumia.is/cms/global-21/icons/men-watches/Skmei_192_x_107_.png",
    "https://eg.jumia.is/cms/global-21/icons/men-watches/Digital_Watches__192_x_107_.png",
    "https://eg.jumia.is/cms/global-21/icons/men-watches/Casual_Watches__192_x_107_.png",
    "https://eg.jumia.is/cms/global-21/icons/men-watches/Formal_Watches__192_x_107_.png",
    "https://eg.jumia.is/cms/global-21/icons/men-watches/Below_99_EGP_Store_192_x_107_.png",
    "https://eg.jumia.is/cms/global-21/icons/men-watches/Wlisth_192_x_107_.png",
  ];
  const { t } = useTranslation("common", "nav");

  const [catProducts, setCatProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductsByCategoryId(catIds.Watches);
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
          <Link href="/category/watches">{t("Watches")}</Link>
        </Breadcrumbs>
        <div className="py-2">
          <SubCategories>
            <Header title={t("WATCHES")} />
            <div className="grid gap-2  grid-cols-1 sm:grid-cols-3  md:grid-cols-6  p-5">
              {imageUrls.map((imageUrl, index) => (
                <div key={index} className="">
                  <Product imageUrl={imageUrl} imageAlt={`img ${index + 1}`} />
                </div>
              ))}
            </div>
          </SubCategories>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12   md:col-span-3">
            <Sidebar
              catData="Watches"
              setCatProducts={setCatProducts}
              id={catIds.Watches}
            />
            ;
          </div>
          <div className=" col-span-12 md:col-span-9 ">
            <CatProdList catProducts={catProducts} catData="Watches" />
          </div>
        </div>
      </main>
    );
  }
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
