// import { defaultPage } from "../default";
import Image from "next/image";
import logo from "@/public/1.png";
import { useEffect, useState } from "react";
import { onAuthStateChanged, deleteUser } from "firebase/auth";
import { auth, firestore } from "@/firebase";
import { useRouter } from "next/router";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { userManagementLayout } from "@/layouts/ProfileDetailsLayout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function DeleteAccount() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const { t } = useTranslation("user");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);
  function deleteAccount() {
    try {
      deleteUser(user)
        .then(() => {
          deleteDoc(doc(firestore, "cart", user.uid))
            .then(() => {
              deleteDoc(doc(firestore, "users", user.uid))
                .then(() => {
                  getDocs(collection(firestore, "order-details")).then(
                    (data) => {
                      setAlertSuccess(true);
                      router.push("/");
                      // Get user order doc from order details collection.
                      const userOrder = data.docs.find((doc) => {
                        return doc.data().userId === user.uid;
                      });
                      // If user make order, also delete it
                      if (userOrder) {
                        deleteDoc(
                          doc(firestore, "order-details", userOrder.id)
                        ).catch((error) => {
                          throw error;
                        });
                      }
                    }
                  );
                })
                .catch((error) => {
                  throw error;
                });
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      setAlertFail(true);
      setTimeout(() => setAlertFail(false), 2000);
    }
  }
  return (
    <>
      <section className="flex flex-col items-center">
        <Image src={logo} width={50} height={50} alt="logo" />
        <h1 className="text-xl my-6">{t("We hate to see you go.")}</h1>
        <p className="text-center">
          {t(
            "Before you delete your account, we would want you to know that this action will delete your data across all Jumia platforms. If that's what you want, please proceed with entering your password to confirm that it's you."
          )}
        </p>
        <form className="w-full mt-6">
          <div className="relative z-0 mb-5">
            <input
              disabled
              type="text"
              defaultValue={user?.email}
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
        </form>
        {/* Modal */}
        <button
          className="btn bg-orange-500 hover:bg-orange-600 text-white  w-full"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          {t("Delete Account")}
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="py-4 text-center">
              {t("Are you sure you want to delete this account?")}
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn text-white bg-red-600 hover:bg-red-800 mx-4"
                  onClick={deleteAccount}
                >
                  {t("Yes, I'm sure")}
                </button>
                <button className="btn">{t("No, cancel")}</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* Alert */}
        <div
          className={
            alertSuccess ? "toast toast-center" : "toast toast-center hidden"
          }
        >
          <div className="alert alert-success">
            <span>{t("Account deleted!.")}</span>
          </div>
        </div>
        <div
          className={
            alertFail ? "toast toast-center " : "toast toast-center hidden"
          }
        >
          <div className="alert alert-error">
            <span>{t("Error happen.")}</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default DeleteAccount;
DeleteAccount.getLayout = userManagementLayout;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["user"])),
      // Will be passed to the page component as props
    },
  };
}
