import { useRouter } from "next/router";
import Elementthree from "./elementthree";
import Shoppingcart from "./shoppingcart";
import Account from "./account";
import Help from "./help";
import { useState } from "react";
import { getSearch } from "@/firebase";
import Link from "next/link";
import LangToggel from "../langToggel/LangToggel";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";

export default function Navbar() {
  const router = useRouter();
  const [productsSearch, setProductsSearch] = useState([]);
  const toast = useSelector((state) => state.toast);
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation("nav");
  const english = /^[A-Za-z0-9]*$/;

  function handleSearch(value) {
    setInputValue(value);
    if (value.length) {
      getSearch(value).then((data) => setProductsSearch([...data]));
    } else {
      setProductsSearch([]);
    }
  }

  function goToAllProducts(e) {
    if (inputValue) {
      router.push({
        pathname: "/category/allProducts",
        query: { queryString: inputValue },
      });
      setProductsSearch([]);
    } else {
      e.preventDefault();
    }
  }

  return (
    <>
      <div className="bg-orange-500   ">
        <div className=" .mx-auto w-full align-middle  md:max-w-7xl mx-auto">
          <img
            src="https://ng.jumia.is/cms/0-1-cpr/2023/new-top-strip/free-delivery-top-strip_1.gif"
            alt="navimage"
          />
        </div>
      </div>
      <LangToggel />
      <div className="bg-white align-middle relative">
        <div className="md:max-w-7xl mx-auto flex py-3 flex-row justify-between items-center flex-wrap lg:flex-nowrap space-y-3 space-x-2 ">
          <span className="flex space-x-2 ">
            <Elementthree />
            <img
              src="/jumia.png"
              className="h-[40px] pt-3 cursor-pointer"
              alt="logo"
              onClick={() => router.push("/")}
            />
          </span>
          <div className="w-full outline-none max-w-md my-auto hidden lg:inline">
            <input
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder={t("Search Products")}
              className="input input-bordered input-warning bg-white w-full outline-none max-w-md  my-auto hidden lg:inline"
            />
            <div
              hidden={productsSearch.length == 0 ? true : false}
              className="bg-white rounded-sm shadow-xl p-3 max-w-md z-10 absolute"
            >
              {productsSearch.map((item) => {
                const product = item.data();
                return (
                  <Link
                    key={item.id}
                    href={`/ProductDetails/${item.id}`}
                    onClick={() => setProductsSearch([])}
                    className="text-sm p-1 block hover:bg-gray-200"
                  >
                    {english.test(inputValue) ? product.en.title : product.ar.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <button
            onClick={(e) => {
              goToAllProducts(e);
            }}
            type="submit"
            className="btn btn-warning rounded-2 text-white hidden lg:inline"
          >
            {t("Search")}
          </button>
          <Account />
          <Help />
          <Shoppingcart />
        </div>
      </div>
      {toast.value ? <Toast message={toast.message} /> : ""}
    </>
  );
}

export function Toast({ message }) {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <svg
          className="w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-white">{message}</span>
      </div>
    </div>
  );
}
