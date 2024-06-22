import React, { useState } from "react";
// import FeedbackList from "../../components/ProductDetails/CustomerFeedback/index";
import ProductSection from "../../components/ProductDetails/ProductSection/index";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import { getProductById } from "@/firebase";
import { Breadcrumbs } from "@mui/material";
import { useAddToCart } from "@/services/addToCart";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Link from "next/link";
import { data5 } from "@/data";
import FeedbackList from "@/components/ProductDetails/CustomerFeedback";

export const getServerSideProps = async ({ params, locale }) => {
  const { id } = params;

  try {
    const product = await getProductById(id);
    const translations = await serverSideTranslations(locale, [
      "productdetails",
      "nav",
    ]);
    return {
      props: { ...translations, product },
    };
  } catch (e) {
    console.log(e);
    return {
      props: { product: null },
    };
  }
};

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { id } = router.query;

  const { query } = useRouter();
  const { t } = useTranslation("productdetails");
  const [addToCart] = useAddToCart();
  const { locale } = useRouter();
  product = product.json;
  console.log(product);
  let date = new Date();

  return (
    <>
      <div className="container mx-auto">
        <h1></h1>
        <div>
          <div className="pt-4 text-md p-2.5">
            <Breadcrumbs separator=">">
              <a href="/" className="opacity-60">
                {t("Home")}
              </a>
              <a href={`/ProductDetails/${query.id}`}>
                {locale == "en"
                  ? product.en.description
                  : product.ar.description}
              </a>
            </Breadcrumbs>
          </div>

          <div className="grid grid-cols-12 gap-4 px-2">
            <div className="bg-white mt-2 col-span-12 md:col-span-9 rounded">
              <div className="grid grid-cols-12  gap-4 mt-3">
                <div className="col-span-4">
                  <img src={product.thumbnail} alt="" />
                  <p className="text-center text-sm pt-1 text-gray-700 mx-2me-2 hover:text-gray-900 text-decoration-none">
                    {t("SHARE THIS PRODUCT")}
                  </p>
                  <div className="flex items-center justify-center mx-2 ">
                    <div className="flex items-center justify-center mx-1 text-gray-700 border border-gray-700 rounded-full border-1 hover:text-gray-900">
                      <FacebookRoundedIcon />
                    </div>
                    <div className="flex items-center justify-center mx-1 text-gray-700 border border-gray-700 rounded-full border-1 hover:text-gray-900">
                      <TwitterIcon />
                    </div>
                  </div>
                </div>

                <div className="col-span-8 p-2.5">
                  <h3 className="text-gray-700 hover:text-gray-900 text-xl">
                    {locale == "en" ? product.en.title : product.ar.title}
                  </h3>
                  <h4 className="text-sm">
                    {t("brand:")}
                    {locale == "en" ? product.en.brand : product.ar.brand}{" "}
                  </h4>
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="flex items-end">
                    <p className="text-gray-700 me-1  text-2xl font-bold hover:text-gray-900">
                      {t("EGP")} {product.price}
                    </p>
                  </div>
                  <p className="text-gray-700 text-[12px]  hover:text-gray-900">
                    {product.quantityInStock} units left
                  </p>
                  <p className="text-gray-700 text-[12px] hover:text-gray-900">
                    {t(
                      "Delivery fees from EGP 35.00 to Minya. Save 10 EGP on shipping with prepaid payment"
                    )}
                  </p>
                  <div className="flex items-center">
                    <div className="flex">
                      <StarIcon
                        className={
                          product.rating >= 1
                            ? "text-amber-500"
                            : "text-grey-100"
                        }
                      />
                      <StarIcon
                        className={
                          product.rating >= 2
                            ? "text-amber-500"
                            : "text-grey-100"
                        }
                      />
                      <StarIcon
                        className={
                          product.rating >= 3
                            ? "text-amber-500"
                            : "text-grey-100"
                        }
                      />
                      <StarIcon
                        className={
                          product.rating >= 4
                            ? "text-amber-500"
                            : "text-grey-100"
                        }
                      />
                      <StarIcon
                        className={
                          product.rating >= 5
                            ? "text-amber-500"
                            : "text-grey-100"
                        }
                      />
                    </div>
                    <div className="mt-1 ms-1 text-sm font-medium text-gray-700 hover:text-gray-900 text-sm color-blue-900">
                      {product.ratingQuantity} {t("verified ratings")}
                    </div>
                  </div>
                  <div className="w-full my-2 border-b border-gray-200 "></div>
                  <p className="text-gray-700 hover:text-gray-900">
                    {t("VARIATION AVAILABLE")}
                  </p>
                  <div className=" border border-amber-500 rounded-none text-center w-[60px]  py-1 text-amber-500 text-sm uppercase">
                    black
                  </div>

                  <button
                    className="flex items-center justify-center px-2 py-2 mx-1 my-2 w-full"
                    style={{
                      backgroundColor: "orange",
                      borderRadius: "4px",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    <div className="self-center mx-2">
                      <AddShoppingCartOutlinedIcon />
                    </div>
                    <p className="text-center">{t("ADD TO CART")}</p>
                  </button>

                  <div className="w-full my-3 border-b border-gray-200"></div>

                  <div>
                    <div className="text-gray-700 hover:text-gray-900">
                      {t("PROMOTIONS")}
                    </div>
                    <div className="flex items-center mb-6">
                      <div className="text-amber-500 text-xl">
                        <StarHalfIcon />
                      </div>
                      <p className="text-sm text-blue-700 mt-1 ms-2">
                        {t("Check All Our Installments Offers from here")}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm  mt-64 ms-2">
                {t("report incorrect product information")}
              </p>
            </div>

            <section className="col-span-12 md:col-span-3">
              <div className="rounded text-black bg-white px-2 mt-2 pt-2">
                <div className="text-sm">
                  <p>{t("DELIVERY RETURNS")}</p>
                </div>
                <div className="w-full my-2 border-b border-gray-200"></div>
                <div>
                  <img
                    src="https://vendorhub.jumia.co.ke/wp-content/uploads/2017/08/Jumia-Express-logo-e1556633520715.png"
                    alt=""
                  />
                  <p className="text-center">
                    {t("Free delivery on thousands of products")}
                  </p>
                </div>
                <div className="w-full my-2 border-b border-gray-200"></div>
                <div className="flex flex-col p-2.5 ">
                  <select
                    className="my-3 form-select"
                    aria-label="Default select example"
                  >
                    <option>{t("Al Minya")}</option>
                    <option value="1">{t("Cairo")}</option>
                    <option value="2">{t("Giza")}</option>
                    <option value="3">{t("Alexandria")}</option>
                  </select>
                  <select
                    className="my-2 form-select"
                    aria-label="Default select example"
                  >
                    <option>{t("Minya")}</option>
                    <option value="1">{t("Magaha")}</option>
                    <option value="2">{t("Malawi")}</option>
                    <option value="3">{t("Samalot")}</option>
                  </select>
                </div>
                <div>
                  <div className="flex items-start justify-between p-2.5">
                    <div className="p-2 border me-2  h-10 rounded ">
                      <VolunteerActivismOutlinedIcon />
                    </div>
                    <div>
                      <div className="flex justify-between w-full ">
                        <p className="text-sm ">{t("Pickup Station")}</p>
                        <Link href="" className=" text-xs text-blue-700">
                          {t("Details")}
                        </Link>
                      </div>
                      <p className="text-xs ">{t("Delivery EGP 35")}</p>
                      <p className="text-xs ">
                        {t(
                          "Arriving at pickup station in three Days from confirmation"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start justify-between p-2.5">
                    <div className="p-2 border me-2  h-10 rounded ">
                      <LocalShippingOutlinedIcon />
                    </div>
                    <div>
                      <div className="flex justify-between w-full">
                        <p className="text-sm ">{t("Door Delivery")}</p>
                        <Link href="" className=" text-xs text-blue-700">
                          {t("Details")}
                        </Link>
                      </div>
                      <p className="text-xs ">{t("Delivery")} </p>
                      <p className="text-xs ">
                        {t(
                          "Ready for delivery in three Days from confirmation"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start justify-between p-2.5">
                    <div className="p-2 border me-2  h-10 rounded ">
                      <AssignmentReturnOutlinedIcon />
                    </div>
                    <div>
                      <div className="flex justify-between w-full">
                        <p className="text-sm ">{t("Return Policy")}</p>
                      </div>

                      <p className="text-xs ">
                        {t(
                          "Free return within the legal return period from 14 to 30 days, and if they meet the terms & conditions, with the need to report any apparent defect within 48 hours. For more details about return policy."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-12 gap-4 px-2">
            <div className="bg-white bg-white mt-2 col-span-12 md:col-span-9 rounded p-5 ">
              <p className="text-gray-700 hover:text-gray-900 font-semibold text-xl">
                {t("Product details")}
              </p>
              <div className="w-full my-4 border-b border-gray-100"></div>
              <ul>
                <li className="text-gray-700 text-sm ">
                  {locale == "en"
                    ? product.en.description
                    : product.ar.description}
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 px-2">
            <section className="  bg-white mt-2 col-span-12 md:col-span-9 rounded p-5 text-xl ">
              <div className="bg-white ">
                <p className="text-gray-700 hover:text-gray-900 font-semibold text-xl">
                  {t("Specifications")}
                </p>
                <div className="my-4 border-b border-gray-100"></div>
                <div className="flex  justify-center pt-6">
                  <div className="rounded-none border p-5">
                    <p className="text-center font-semibold text-sm p-3.5 text-gray-700 hover:text-gray-900">
                      {t("SPECIFICATIONS")}
                    </p>
                    <ul className="list-disc list-inside p-1">
                      <li className="text-base text-gray-700 text-sm font-medium py-1 ">
                        {t("SKU:")} {product.sku}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-12 gap-4 px-2 ">
            <div className="bg-white mt-2 col-span-12 md:col-span-9 p-5 rounded">
              <p className="text-gray-700 hover:text-gray-900 font-medium text-xl">
                {t("Customers who viewed this also viewed")}
              </p>
              <ProductSection
                data={data5}
                display="hidden"
                flash="hidden"
                time="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 px-2">
            <div className="mt-3 bg-white mt-2 col-span-12 md:col-span-9 rounded">
              <FeedbackList product={product} id={id} />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 px-2">
            <div className="bg-white mt-2 col-span-12 md:col-span-9 rounded p-5 ">
              <p className="text-gray-700 hover:text-gray-900 text-xl font-medium">
                You may also like
              </p>
              <ProductSection
                data={data5}
                display="hidden"
                flash="hidden"
                time="hidden"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-4 px-2">
          <div className="bg-white mt-2 col-span-10  rounded p-5">
            <p className="text-gray-700 hover:text-gray-900 font-medium text-xl">
              {t("More items from this seller")}
            </p>
            <ProductSection
              data={data5}
              display="hidden"
              flash="hidden"
              time="hidden"
            />
          </div>
        </div>
        <div className="grid grid-cols-10 gap-4 px-2 pb-5">
          <section className="bg-white mt-2 col-span-10  rounded p-5">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-gray-700 hover:text-gray-900 font-medium text-xl">
                {t("Recently Viewed")}
              </h3>
              <div className="border-b border-gray-300"></div>
              <button className="flex text-amber-500  bg-transparent items-center ">
                {t("SEE ALL")}{" "}
                <ArrowForwardIosIcon className="text-sm text-amber-500" />
              </button>
            </div>
            <ProductSection
              data={data5}
              display="hidden"
              flash="hidden"
              time="hidden"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
