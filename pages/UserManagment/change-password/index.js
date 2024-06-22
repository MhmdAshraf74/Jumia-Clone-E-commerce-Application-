"use client";
import { useForm } from "react-hook-form";
import { onAuthStateChanged, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userManagementLayout } from "@/layouts/ProfileDetailsLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
function ChangePassword() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [current, setCurrent] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const { t } = useTranslation("user");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    // Form schema.
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    // Get user info.
    onAuthStateChanged(auth, (user) => {
      getDoc(doc(firestore, "users", user.uid))
        .then((doc) => {
          const userDoc = doc.data();
          setCurrent(new RegExp(userDoc.xd));
          setUser({ userDoc, user });
        })
        .catch((error) => {
          console.log("Error get user: ", error);
        });
    });
  }, []);
  function onSubmit(data) {
    updateDoc(doc(firestore, "users", user.userDoc.userID), {
      xd: data.newPassword,
    })
      .then(() => {
        setAlertSuccess(true);
        updatePassword(user.user, data.newPassword);
        setTimeout(
          () => router.push("/UserManagment/basic-details/show"),
          1000
        );
      })
      .catch(() => {
        setAlertFail(true);
        setTimeout(() => setAlertFail(false), 1000);
      });
  }
  return (
    <>
      <h1 className="text-xl mb-5">{t("Password Settings")}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 mb-5">
          <input
            type="password"
            {...register("currentPassword", {
              required: true,
              pattern: {
                value: current,
                message: "Invalid current password.",
              },
            })}
            id="floating_standard"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
          />
          <label
            htmlFor="floating_standard"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            {t("Current Password")}
          </label>
          <p className="text-red-400">{errors.currentPassword?.message}</p>
        </div>
        <div className="relative z-0 mb-5">
          <input
            type="password"
            {...register("newPassword", {
              required: "felid required.",
              minLength: {
                value: 8,
                message: "min length 8 characters.",
              },
            })}
            id="floating_standard"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
          />
          <label
            htmlFor="floating_standard"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            {t("New Password")}
          </label>
          <p className="text-red-400">{errors.newPassword?.message}</p>
        </div>
        <div className="relative z-0 mb-5">
          <input
            type="password"
            {...register("confirmPassword", {
              required: "felid required.",
              validate: (value) =>
                value === getValues("newPassword") || "Password must match.",
            })}
            id="floating_standard"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
          />
          <label
            htmlFor="floating_standard"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            {t("Confirm Password")}
          </label>
          <p className="text-red-400">{errors.confirmPassword?.message}</p>
        </div>
        <button
          type="submit"
          className="text-white px-20 rounded-md py-3 bg-orange-500 hover:bg-orange-600"
        >
          {t("Submit")}
        </button>
      </form>
      <div
        className={
          alertSuccess ? "toast toast-center" : "toast toast-center hidden"
        }
      >
        <div className="alert alert-neutral">
          <span>{t("successfully updated!.")}</span>
        </div>
      </div>
      <div
        className={
          alertFail ? "toast toast-center " : "toast toast-center hidden"
        }
      >
        <div className="alert alert-error">
          <span>{t("Error updating.")}</span>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
ChangePassword.getLayout = userManagementLayout;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["user"])),
      // Will be passed to the page component as props
    },
  };
}
