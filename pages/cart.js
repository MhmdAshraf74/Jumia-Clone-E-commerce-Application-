import { Button } from "@material-tailwind/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRouter } from "next/router";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/image";
import logoExpress from "@/public/Logo-express.png";
import cartEmpty from "@/public/cartEmpty.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/firebase";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Cart() {
  const router = useRouter();
  const [cartProducts, setCartProducts] = useState([]);
  const [userState, setUserState] = useState(null);
  const { t } = useTranslation("cart");
  const { locale } = useRouter();
  let separateProducts = Array();
  let total = Number();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(user);
        onSnapshot(doc(firestore, "cart", user.uid), (snapShot) => {
          setCartProducts(snapShot.data()?.products);
        });
      } else {
        let productsFromLocalSorage = JSON.parse(localStorage.getItem("cart"));
        setCartProducts(productsFromLocalSorage);
      }
    });
  }, []);

  function increaseCart(index) {
    // User make update on him cart.
    separateProducts = [...cartProducts];
    ++separateProducts[index].quantity;
    // Check the user is sign in or not
    if (userState) {
      // Call firebase to update user cart
      updateDoc(doc(firestore, "cart", userState.uid), {
        products: [...separateProducts],
      });
    } else {
      // Call localStorage to update user cart
      localStorage.setItem("cart", JSON.stringify(separateProducts));
      setCartProducts(separateProducts);
    }
  }

  function decreaseCart(index) {
    // User make update on him cart.
    separateProducts = [...cartProducts];
    --separateProducts[index].quantity;
    // Check the user is sign in or not
    if (userState) {
      // Call firebase to update user cart
      updateDoc(doc(firestore, "cart", userState.uid), {
        products: [...separateProducts],
      });
    } else {
      // Call localStorage to update user cart
      localStorage.setItem("cart", JSON.stringify(separateProducts));
      setCartProducts(separateProducts);
    }
  }

  function removeProductFromCart(index) {
    // User make update on him cart.
    separateProducts = [...cartProducts];
    separateProducts.splice(index, 1);
    if (userState) {
      // Call firebase to update user cart
      updateDoc(doc(firestore, "cart", userState.uid), {
        products: [...separateProducts],
      });
    } else {
      // Call localStorage to update user cart
      localStorage.setItem("cart", JSON.stringify(separateProducts));
      setCartProducts([...separateProducts]);
    }
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-4 lg:max-w-7xl">
        <form className=" lg:grid lg:grid-cols-12 lg:items-start  gap-x-4">
          {cartProducts?.length > 0 ? (
            <>
              <section
                aria-labelledby="cart-heading"
                className="p-4 rounded-md bg-white lg:col-span-8"
              >
                <ul role="list" className="divide-y divide-gray-200">
                  {cartProducts.map((product, index) => {
                    total += product.product?.price * product.quantity;
                    return (
                      <div key={product.product?.proId}>
                        <li className="flex py-6 sm:py-6 ">
                          <div className="flex-shrink-0">
                            <Image
                              width={100}
                              height={100}
                              src={product.product.thumbnail}
                              alt={product.product.en.title}
                              className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <a
                                    href={product.product.thumbnail}
                                    className=" text-black"
                                  >
                                    {locale === "en"
                                      ? product.product.en.title
                                      : product.product.ar.title}
                                  </a>
                                </h3>
                              </div>
                              <div className="flex justify-end">
                                <p className="text-xl font-medium text-gray-900">
                                  {t("EGP")} {product.product?.price}.00
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <p className="text-xs text-orange-500">
                                {product.product.quantityInStock}{" "}
                                {t("units left")}
                              </p>
                            </div>
                            <Image
                              width={100}
                              height={100}
                              src={logoExpress}
                              alt="jumia logo"
                              className="w-24 object-contain"
                            />
                          </div>
                        </li>
                        <div className="mb-2 flex justify-between">
                          <div className="flex">
                            <button
                              type="button"
                              className="flex rounded p-2 items-center space-x-2 hover:bg-orange-500/25"
                              onClick={() => {
                                removeProductFromCart(index);
                              }}
                            >
                              <DeleteForeverIcon
                                size={18}
                                className="text-orange-500"
                              />
                              <span className="text-sm font-medium text-orange-500">
                                {t("REMOVE")}
                              </span>
                            </button>
                          </div>
                          <div className="min-w-24 flex">
                            <Button
                              className="text-white"
                              variant="gradient"
                              size="sm"
                              color="amber"
                              disabled={product.quantity == 1}
                              onClick={() => decreaseCart(index)}
                            >
                              -
                            </Button>
                            <span className="mx-6">{product.quantity}</span>
                            <Button
                              className="text-white"
                              variant="gradient"
                              size="sm"
                              color="amber"
                              onClick={() => increaseCart(index)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </section>
              <section className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0">
                <div className=" flex items-center p-3">
                  <h2 className="m-0 p-0">{t("CART SUMMARY")}</h2>
                </div>

                <div className="flex justify-between border-y my-2  p-3">
                  <div className="text-base font-medium text-gray-900">
                    {t("Subtotal")}
                  </div>
                  <div className="text-base font-medium text-gray-900">
                    {t("EGP")} {total}.00
                  </div>
                </div>
                <div className="flex justify-between p-3">
                  <CheckCircleOutlineIcon className="text-3xl me-1 text-green-600" />
                  <p className="p-0 m-0 text-sm">
                    {t("Jumia Express items are eligible for free delivery")}
                  </p>
                </div>
                <Image
                  className="px-3"
                  width={120}
                  height={120}
                  src={logoExpress}
                  alt="logo express"
                />
                <div className="text-green-700 border-t">
                  <div className="flex gap-4 p-2">
                    <Button
                      onClick={() => {
                        userState
                          ? router.push("/checkout_layout/address")
                          : router.push("/identification");
                      }}
                      variant="gradient"
                      className="text-lg text-white"
                      color="amber"
                      fullWidth
                    >
                      {" "}
                      {t("Checkout")} ({total}.00)
                    </Button>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <section
              aria-labelledby="cart-heading"
              className="p-4 rounded-md bg-white lg:col-span-12"
            >
              <div className="flex flex-col items-center my-2 text-black">
                <Image
                  width={100}
                  height={100}
                  src={cartEmpty}
                  alt="Cart empty logo"
                />
                <p className="my-4"> </p>
                <p className="text-xs mb-4">
                  {t("Browse our categories and discover our best deals!")}
                </p>
                <Button
                  onClick={() => router.push("/")}
                  className="text-xs text-white"
                  color="amber"
                >
                  {t("START SHOPPING")}
                </Button>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}

export default Cart;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["cart"])),
      // Will be passed to the page component as props
    },
  };
}
