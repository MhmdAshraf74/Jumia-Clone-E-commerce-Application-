import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Breadcrumbs } from "@material-tailwind/react";
import MySpinner from "@/components/order/Spiner/Spinner";
import CatProdList from "@/components/CatProdList/CatProdList";
import { getAllSubCategories, getProductsBySubCategoryId } from "@/firebase";
import { catIds, subCatIds } from "@/data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";
export default function Phones() {
  const [loading, setLoading] = useState(true);
  const [catProducts, setCatProducts] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const { t } = useTranslation("common", "nav");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductsBySubCategoryId(subCatIds.mobile);
        const subCat = await getAllSubCategories(catIds.Electronics);
        setCatProducts(products);
        setSubCats(subCat);
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
          <Link href={`/category/electronics`}>{t("Electronics")}</Link>
          <Link href="/category/electronics/mobile">{t("Mobile")}</Link>
        </Breadcrumbs>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12   md:col-span-3">
            <Sidebar
              catData="Electronics"
              subCats={subCats}
              subCatId={subCatIds.mobile}
              setCatProducts={setCatProducts}
              id={catIds.Electronics}
            />
            ;
          </div>
          <div className=" col-span-12 md:col-span-9 ">
            <CatProdList
              catProducts={catProducts}
              catData="Electronics"
              subCatData={t("Mobile")}
            />
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
