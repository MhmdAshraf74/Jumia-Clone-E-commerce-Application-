import React, { useEffect, useState } from "react";
import { getProductsByCategoryId } from "../../firebase";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Breadcrumbs } from "@material-tailwind/react";
import SubCategories from "@/components/Product/subcategories";
import Header from "@/components/Product/header";
import Product from "@/components/Product/product";
import MySpinner from "@/components/order/Spiner/Spinner";
import Link from "next/link";

import CatProdList from "@/components/CatProdList/CatProdList";
import { catIds } from "@/data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Supermarket() {
  const [loading, setLoading] = useState(false);
  const imageUrls = [
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/24.png",
    " https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/18.png",
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/20.png",
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/22.png",
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/54.png",
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/16.png ",
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/12.png",
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/10.png",
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/8.png",
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/6.png",
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/64.png",
    "https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Supermarket/EN/3.png",
  ];
  const imageUrls1 = [
    "https://eg.jumia.is/cms/Ramadan-24/CATs-UNs/Supermarket/Household-Cleaning/572x250EN.jpg",
    "https://eg.jumia.is/cms/Ramadan-24/CATs-UNs/Supermarket/Household-Cleaning/572x250EN.jpg",
  ];
  const imageUrls2 = [
    "https://eg.jumia.is/cms/Ramadan-24/CATs-UNs/Supermarket/Feminine-Care/572x250EN.png",
    "https://eg.jumia.is/cms/Ramadan-24/CATs-UNs/Supermarket/Farida/572x250EN.png",
  ];
  const [catProducts, setCatProducts] = useState([]);
  const { t } = useTranslation("common", "nav");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductsByCategoryId(catIds.Supermarket);
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
          <Link href="/category/supermarket">{t("Supermarket")}</Link>
        </Breadcrumbs>
        <div className="">
          <SubCategories>
            <Header title={t("SUPERMARKET")} />
            <div className="grid gap-2  grid-cols-1 sm:grid-cols-3  md:grid-cols-6   p-5">
              {imageUrls.map((imageUrl, index) => (
                <div key={index} className="justify-self-center">
                  <Product imageUrl={imageUrl} imageAlt={`img ${index + 1}`} />
                </div>
              ))}
            </div>
          </SubCategories>
          <SubCategories>
            <div className="my-3">
              <Header title={t("SUPERMARKET TOP DEALS")} />
              <div className="grid gap-2  grid-cols-1   md:grid-cols-2  justify-center items-center p-5">
                {imageUrls1.map((imageUrl, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <Product
                      imageUrl={imageUrl}
                      imageAlt={`img ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </SubCategories>
          <SubCategories>
            <div className="my-3">
              <Header title={t("CHECK MORE DEALS")} />
              <div className="grid gap-2  grid-cols-1   md:grid-cols-2  justify-center items-center p-5">
                {imageUrls2.map((imageUrl, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <Product
                      imageUrl={imageUrl}
                      imageAlt={`img ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </SubCategories>
        </div>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12   md:col-span-3">
            <Sidebar
              catData="Supermarket"
              setCatProducts={setCatProducts}
              id={catIds.Supermarket}
            />
            ;
          </div>
          <div className=" col-span-12 md:col-span-9 ">
            <CatProdList catProducts={catProducts} catData="Supermarket" />
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
