import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, firestore } from "@/firebase";
import { useForm } from "react-hook-form";
import MySpinner from "@/components/order/Spiner/Spinner";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { userManagementLayout } from "@/layouts/ProfileDetailsLayout";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
function BasicDetails() {
  const router = useRouter();
  const { state } = router.query;
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(true);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const { t } = useTranslation("user");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    displayName: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
  });

  useEffect(() => {
    // Keep state user updated.
    onAuthStateChanged(auth, (user) => {
      onSnapshot(doc(firestore, "users", user.uid), (localUser) => {
        setUser(localUser.data());
      });
    });
    // Check on route state.
    if (state == "edit") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [state]);

  function onSubmit(userInfo) {
    updateDoc(doc(firestore, "users", user.userID), userInfo)
      .then(() => {
        setAlertSuccess(true);
        router.push("/UserManagment/basic-details/show");
        setTimeout(() => {
          router.reload();
        }, 1000);
      })
      .catch(() => {
        setAlertFail(true);
        setTimeout(() => setAlertFail(false), 1000);
      });
  }

  return (
    <>
      {user ? (
        <>
          <div>
            <div className="flex justify-between mb-5">
              <h1 className="text-xl py-1">{t("Profile Details:")}</h1>
              <Link
                href="/UserManagment/basic-details/edit"
                className="text-xl px-2 py-1 text-orange-400 hover:bg-orange-400/25"
                hidden={!show}
              >
                {t("Edit Profile")}
              </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative z-0 mb-5">
                <input
                  disabled={show}
                  type="text"
                  defaultValue={user.displayName}
                  {...register("displayName", {
                    required: true,
                    minLength: { value: 4, message: "must have 4 characters." },
                  })}
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  {t("Name")}
                </label>
                <p className="text-red-400">{errors.displayName?.message}</p>
              </div>
              <div className="relative z-0 mb-5" hidden={!show}>
                <input
                  disabled
                  type="text"
                  defaultValue={user.email}
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  {t("Email")}
                </label>
              </div>
              <select
                disabled={show}
                {...register("gender")}
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option disabled defaultValue={user.gender ? user.gender : ""}>
                  {t("Gender")}
                </option>
                <option value="male">{t("Male")}</option>
                <option value="female">{t("Female")}</option>
              </select>
              <div className="relative z-0 w-full group mb-5 mt-10">
                <input
                  disabled={show}
                  type="date"
                  defaultValue={user.birthDate ? user.birthDate : ""}
                  {...register("birthDate", { required: "felid is required" })}
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  {t("Birth date")}
                </label>
              </div>
              <div className="relative z-0 mb-8">
                <input
                  disabled={show}
                  defaultValue={user.phoneNumber}
                  {...register("phoneNumber", {
                    required: "felid is required",
                    pattern: {
                      value: /^01[0-9]{9}$/,
                      message: "must start in (01) and 11 numbers",
                    },
                  })}
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-500 peer"
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  {t("Phone Number")}
                </label>
                <p className="text-red-400">{errors.phoneNumber?.message}</p>
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
                alertSuccess
                  ? "toast toast-center"
                  : "toast toast-center hidden"
              }
            >
              <div className="alert alert-success">
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
          </div>
        </>
      ) : (
        <MySpinner />
      )}
    </>
  );
}

export default BasicDetails;
BasicDetails.getLayout = userManagementLayout;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["user"])),
      // Will be passed to the page component as props
    },
  };
}
