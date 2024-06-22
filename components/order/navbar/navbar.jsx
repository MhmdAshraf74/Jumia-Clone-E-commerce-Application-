import Image from "next/image";
import React from "react";
import PermPhoneMsgOutlinedIcon from "@mui/icons-material/PermPhoneMsgOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
function TMyNavbar() {
  const { t } = useTranslation("order");

  return (
    <>
      <div className="my-2 flex flex-col gap-2 relative text-black flex w-full gap-2 md:w-max lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
        <Link href="/help">
          <span className="flex">
            <span className="flex flex-row items-center">
              <PermPhoneMsgOutlinedIcon className="mx-4 " />
              <span className="flex flex-col text-sm">
                <span>{t("Need Help?")}</span>
                <span>{t("Contact Us")}</span>
              </span>
            </span>
          </span>
        </Link>
        <Link href="#">
          <span className="flex flex-row items-center ">
            <KeyboardReturnOutlinedIcon className="mx-4 " />
            <span className="flex flex-col text-sm ">
              <span className="">{t("Return Easy")}</span>
              <span>{t("Return")}</span>
            </span>
          </span>
        </Link>
        <Link href="#">
          <span className="flex flex-row items-center">
            <LocalPoliceOutlinedIcon className="mx-4 " />
            <span className="flex flex-col text-sm">
              <span className="fs-1">{t("Secure")}</span>
              <span>{t("Payment")}</span>
            </span>
          </span>
        </Link>
      </div>
    </>
  );
}
export default MyNavbar;
export function MyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const { t } = useTranslation("order");
  return (
    <Navbar
      fullWidth={true}
      shadow={false}
      className=" mx-auto  px-4 py-3 round-0 mb-2  max-w-screen-xl px-6 py-3 max-w-full"
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        >
          <img
            src="/jumia.png"
            height={40}
            width={180}
            className="  cursor-pointer"
            alt="logo"
          />
        </Typography>
        <Typography
          variant="h4"
          className="mr-4 ml-2 capitalize py-1.5 flex-grow text-center"
        >
          {t("edit order details")}
        </Typography>
        <div className="hidden lg:block">
          <TMyNavbar />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <CancelIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <TMyNavbar />
      </Collapse>
    </Navbar>
  );
}
