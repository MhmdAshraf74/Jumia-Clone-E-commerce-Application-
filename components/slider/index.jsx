import React, { useState, useEffect } from "react";
import RecomHeader from "../Product/header";
import { getAllProducts } from "../../firebase";
import Link from "next/link";
import MySpinner from "../order/Spiner/Spinner";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
export default function SliderMainPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("home");
  const { locale } = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MySpinner />
      </div>
    );
  } else {
    return (
      <div className=" mt-5  items-center justify-center ">
        <RecomHeader title={t("Recommended Products")} color="bg-yellow-300" />
        <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4  gap-2 mt-1">
          {products.map((product) => (
            <div key={product.id} className=" ">
              <div className="bg-white p-6 shadow-md rounded-md h-[400px] flex flex-col justify-between ">
                <div className="flex justify-center items-center">
                  <img
                    src={product.thumbnail}
                    alt={product.en.title}
                    className="h-[150px]   "
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 ">
                    {locale == "en" ? product.en.title : product.ar.title}
                  </h3>
                </div>
                <div className=" self-center">
                  <Link
                    href={`/ProductDetails/${product.id}`}
                    className="btn btn-warning rounded-2 text-white  p-3 m-2"
                  >
                    {t("Details")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
