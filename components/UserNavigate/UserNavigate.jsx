"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { auth, firestore } from "@/firebase";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SecurityIcon from "@mui/icons-material/Security";
import MySpinner from "@/components/order/Spiner/Spinner";
import logo from "@/public/1.png";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useTranslation } from "next-i18next";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={4}
      stroke="orange"
      className={`${
        id === open ? "rotate-90" : ""
      } h-3 w-3 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 8.25l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

function UserNavigate() {
  const [open, setOpen] = useState(0);
  const [user, setUser] = useState(null);
  const { t } = useTranslation("user");
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      onSnapshot(doc(firestore, "users", user.uid), (localUser) => {
        setUser(localUser.data());
      });
    });
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col items-center  mb-10">
          <Image src={logo} width={50} height={50} alt="logo" />
          <h1 className="mt-3 font-medium">
            {t("Hello")}, {user?.displayName || <MySpinner />}
          </h1>
        </div>
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            <AccountCircleIcon />
            {t("Profile Details")}
          </AccordionHeader>
          <AccordionBody>
            <Link
              href="/UserManagment/basic-details/show"
              className="p-3 block font-medium text-md hover:bg-gray-100"
            >
              {t("Basic Details")}
            </Link>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            <SecurityIcon />
            {t("Security Setting")}
          </AccordionHeader>
          <AccordionBody>
            <Link
              href="/UserManagment/change-password"
              className="p-3 block font-medium text-md hover:bg-gray-100"
            >
              {t("Change Password")}
            </Link>
            <Link
              href="/UserManagment/delete-account"
              className="p-3 block font-medium text-red-500 text-md hover:bg-gray-100"
            >
              {t("Delete Account")}
            </Link>
          </AccordionBody>
        </Accordion>
      </div>
    </>
  );
}

export default UserNavigate;
