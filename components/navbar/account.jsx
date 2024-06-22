import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "@/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useTranslation } from "next-i18next";
export default function Account() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [userState, setUserState] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation("nav");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function handleClickList(routePath) {
    const user = auth.currentUser;
    // I check. User is login or not.
    if (user) {
      router.push(routePath);
    } else {
      router.push("/identification");
    }
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDoc(doc(firestore, "users", user.uid)).then((user) =>
          setUserState(user.data())
        );
        setUserState(user);
      }
    });
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="cursor-pointer flex items-center justify-center"
        onClick={toggleDropdown}
      >
        {userState ? (
          <>
            <PersonOutlineIcon className="h-12 font-bold" />
            <span>
              {t("Hi")}, {userState.displayName?.split(" ")[0] || <Spinner />}
            </span>
          </>
        ) : (
          <>
            <PersonOutlineIcon className="h-12 font-bold" />
            <span>{t("Account")}</span>
          </>
        )}
      </div>
      {isOpen && (
        <div
          className="absolute top-full w-48 left-0 mt-2 bg-white border border-gray-300 shadow-md rounded-md"
          style={{ zIndex: 100 }}
          id="container"
        >
          <div className="flex items-center justify-center">
            {userState ? (
              ""
            ) : (
              <button
                type="submit"
                className="btn btn-warning m-2 px-9 text-white hidden lg:inline"
                onClick={() => {
                  router.push("/identification");
                }}
              >
                {t("SIGNUP")}
              </button>
            )}
          </div>
          <hr></hr>
          <div
            onClick={() => {
              handleClickList("/account/JumiaAccount");
            }}
          >
            <div className="block cursor-pointer px-4 py-2 hover:bg-gray-100">
              <div className="flex items-center space-x-2">
                <PersonOutlineIcon className="h-6" />
                <span>{t("My Account")}</span>
              </div>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleClickList("/account/Orders");
            }}
          >
            <div className="block px-4 py-2 hover:bg-gray-100">
              <div className="flex items-center space-x-2">
                <ShoppingBagOutlinedIcon className="h-6" />
                <span>{t("Orders")}</span>
              </div>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleClickList("/account/Saveditems");
            }}
          >
            <div className="block px-4 py-2 hover:bg-gray-100">
              <div className="flex items-center space-x-2">
                <FavoriteBorderIcon className="h-6" />
                <span>{t("Saved Items")}</span>
              </div>
            </div>
          </div>
          {userState ? (
            <Button
              type="submit"
              className="m-4 py-3 px-9 text-white"
              size="lg"
              loading={isLoading}
              color="amber"
              onClick={() => {
                signOut(auth).then(() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setUserState(null);
                    router.reload();
                  }, 2000);
                });
              }}
            >
              {t("SIGNOUT")}
            </Button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
