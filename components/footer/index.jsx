import React from "react";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Button } from "@material-tailwind/react";
import { useTranslation } from "next-i18next";
const Footer = () => {
  const { t } = useTranslation("nav");
  return (
    <div className="bg-gray-800" style={{ backgroundColor: "#535357" }}>
      <footer
        className="footer-top-strip px-5"
        style={{ backgroundColor: "#313131" }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-2 px-5 py-4">
              <img
                className="w-96 md:w-36 md:h-8"
                src="https://techinporto.com/archive/2017/img/Jumia_Group_Logo_white.png"
                alt=""
              />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-6 px-5 py-4">
              <h6 className="text-white font-bold">{t("New to Jumia?")}</h6>
              <p className="text-white">
                {t(
                  "Subscribe to our newsletter to get updates on our latest offers!"
                )}
              </p>
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center mt-2">
                <div className="relative mb-2 md:mb-0">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <MarkunreadOutlinedIcon className="text-gray-400 h-6 w-6" />
                  </span>
                  <input
                    type="text"
                    className="form-input py-3 pl-10 border-2 border-gray-200 rounded-sm"
                    placeholder={t("Enter E-mail Address")}
                    aria-label="Enter E-mail Address"
                  />
                </div>
                <div className="flex mt-3 lg:mt-0 items-center  ">
                  <Button
                    variant="outlined"
                    color="white"
                    className="lg:mx-3 hover:text-amber-500 hover:border-amber-500"
                  >
                    {t("Male")}
                  </Button>
                  <Button
                    variant="outlined"
                    color="white"
                    className=" hover:text-amber-500 hover:border-amber-500"
                  >
                    {t("Female")}
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-12 lg:col-span-4 px-5 py-4">
              <div className="flex items-center">
                <div className="star-box flex items-center justify-center">
                  <StarsOutlinedIcon className="m-1 text-white w-8 h-8" />
                </div>
                <div className="ml-2">
                  <h6 className="text-white font-bold">{t("New to Jumia?")}</h6>
                  <p className="text-white">
                    {t("Get access to exclusive offers!")}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-center md:justify-start space-x-4">
                <img
                  className="w-30 h-8"
                  src="https://www.pikpng.com/pngl/b/144-1445686_app-store-available-on-apple-google-store-logo.png"
                  alt=""
                />
                <img
                  className="w-30 h-8"
                  src="https://play.google.com/intl/en_us/badges/images/books/en-play-badge-border.png?hl=es-419"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer
        className="container mx-auto px-5 py-4"
        style={{ backgroundColor: "#535357" }}
      >
        <div className="flex flex-wrap gap-4">
          <div className="w-full lg:w-1/6 md:w-1/2 pt-2">
            <h2 className="text-white font-heading text-base mb-2">
              {t("NEED HELP?")}
            </h2>
            <ul className="list-unstyled text-white text-xs">
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {t("Chat with us")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {t("Help Center")}
                </a>
              </li>
              <li className="mb-1">
                <a href="/contact" className="hover:underline">
                  {t("Contact Us")}
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/6 md:w-1/2">
            <h2 className="text-white font-heading text-base mb-2">
              {t("USEFUL LINKS")}
            </h2>
            <ul className="list-unstyled text-white text-xs">
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {t("Service Center")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {t("How to shop on Jumia?")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {t("Delivery options and timelines")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {t("How to return a product on Jumia?")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Corporate and bulk purchases")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Report a Product")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Ship your package anywhere in Egypt")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Dispute Resolution Policy")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Returns & Refund Timeline")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Return Policy")}
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/6 md:w-1/2">
            <h2 className="text-white font-heading text-base mb-2">
              {" "}
              {t("ABOUT JUMIA")}
            </h2>
            <ul className="list-unstyled text-white text-xs">
              <li className="mb-1">
                {" "}
                {t("How to return a product on Jumia?")}
                <a href="/about" className="hover:underline">
                  {" "}
                  {t("About us")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Jumia careers")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Jumia Express")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Terms and Conditions")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Privacy Notice")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Jumia Store Credit Terms & Conditions")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Jumia Payment Information Guidelines")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Cookie Notice")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Jumia Global")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Official Stores")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Flash Sales")}
                </a>
              </li>
            </ul>
          </div>
          <div
            className="w-full lg:w-1/6 md:w-1/2"
            //
          >
            <h2 className="text-white font-heading text-base mb-2">
              {" "}
              {t("NEED HELP?")}
            </h2>
            <ul className="list-unstyled text-white text-xs">
              <li className="mb-1">
                <a href="/about" className="hover:underline">
                  {" "}
                  {t("Sell on Jumia")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Vendor hub")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Become a Sales Consultant")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Become a Logistics Service Partner")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Join the Jumia DA Academy")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Join the Jumia KOL Program")}
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/6 md:w-1/2">
            <h2 className="text-white font-heading text-base mb-2">
              {" "}
              {t("NEED HELP?")}
            </h2>
            <ul className="list-unstyled text-white text-xs">
              <li className="mb-1">
                <a href="/about" className="hover:underline">
                  {" "}
                  {t("Sell on Jumia")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Vendor hub")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Become a Sales Consultant")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Become a Logistics Service Partner")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Join the Jumia DA Academy")}
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="hover:underline">
                  {" "}
                  {t("Join the Jumia KOL Program")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-2 border-b border-gray-300">
          <div className="p-5 md:pb-4">
            <h4 className="text-white mb-1 md:ml-5">{t("JOIN US ON")}</h4>
            <div className="flex flex-row md:pl-5 py-2 mb-2">
              <a href="#" className="text-white text-2xl mr-2">
                <i className="text-xl social-icons text-white">
                  <FacebookOutlinedIcon />
                </i>
              </a>
              <a href="#" className="text-white text-2xl mx-2">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white text-2xl mx-2">
                <i className="text-xl social-icons text-white">
                  <CameraAltIcon />
                </i>
              </a>
              <a href="#" className="text-white text-2xl mx-2">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          <div className="p-5 md:pb-4">
            <h4 className="text-white mb-1 md:ml-5">
              {t("PAYMENT METHODS & DELIVERY PARTNERS")}
            </h4>
            <div className="flex flex-row md:pl-5 py-2 mb-2">
              <a href="#" className="text-white text-2xl mr-3">
                <i className="text-xl social-icons text-white">
                  <VolunteerActivismIcon />
                </i>
              </a>
              <a href="#" className="text-white text-2xl mx-3">
                <i className="fab fa-cc-mastercard"></i>
              </a>
              <a href="#" className="text-white text-2xl mx-3">
                <i className="text-xl social-icons text-white">
                  <CreditCardIcon />
                </i>
              </a>

              <a href="#" className="text-white text-2xl mx-3">
                <i className="fab fa-maxcdn"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <footer
        className="bg-gray-700 text-white text-center py-4"
        style={{ backgroundColor: "#535357" }}
      >
        <p className="mb-0">
          &copy; {new Date().getFullYear()} {t("Powered Jumia")}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
