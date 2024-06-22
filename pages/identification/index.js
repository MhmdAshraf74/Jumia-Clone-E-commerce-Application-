import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import {
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import { setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "@/firebase";
import Image from "next/image";
import topLogo from "@/public/1.png";
import bottomLogo from "@/public/bottom-logo.png";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Login_signup() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const [spinner, setSpinner] = useState(false);
  const [storageProducts, setStorageProducts] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setStorageProducts(JSON.parse(localStorage.getItem("cart")));
  }, []);
  const { t } = useTranslation("login");

  async function loginOrSignup({ email }) {
    const isExist = await fetchSignInMethodsForEmail(auth, email);
    if (isExist.length) {
      router.push("/identification/login/" + email);
    } else {
      router.push("/identification/signup/" + email);
    }
  }

  function loginWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const userID = result.user.uid;
        const displayName = result.user.displayName;
        const phoneNumber = result.user.phoneNumber;
        const email = result.user.email;
        const emailVerified = result.user.emailVerified;
        // Set new user in users collection.
        setDoc(doc(firestore, "users", userID), {
          userID,
          displayName,
          email,
          phoneNumber,
          emailVerified,
        });
        // If there cart in local storage set it in him fire store cart collection.
        if (storageProducts) {
          setDoc(doc(firestore, "cart", result.user.uid), {
            products: [...storageProducts],
          });
          // Remove it from local storage.
          localStorage.removeItem("cart");
        }
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // For UI.
        setSpinner(true);
        setTimeout(() => {
          setSpinner(false);
          router.push("/");
        }, 3000);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("Error: ", error);
      });
    // We not need this part.
  }

  return (
    <>
      {spinner ? <Spinner /> : ""}
      <Card
        className={
          spinner
            ? "flex flex-col items-center pt-10 relative opacity-25 px-3 min-h-screen"
            : "flex flex-col items-center pt-10 relative px-3 min-h-screen"
        }
        shadow={false}
      >
        <div className="flex flex-col items-center w-full md:w-[30rem]">
          <Image
            width="70"
            height="70"
            className="object-cover object-center mb-3"
            src={topLogo}
            alt="logo-image"
          />
          <Typography variant="h3" color="black">
            {t("Welcome to Jumia")}
          </Typography>
          <Typography color="black" className="mt-1 text-center">
            {t(
              "Type your e-mail or phone number to log in or create a Jumia account."
            )}
          </Typography>
        </div>

        <form
          className="border-b-2 w-full md:w-[28rem] "
          onSubmit={handleSubmit(loginOrSignup)}
        >
          <div className="w-full md:w-[28rem] my-10">
            <Input
              size="lg"
              color={errors.email ? "red" : "orange"}
              label={t("Enter your email")}
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@(gmail|yahoo|outlook)+(.com)$/,
                  message:
                    "This email is not valid. inser valid email to continue. Email must be (gmail - yahoo - outlook).",
                },
              })}
            />
            <p className="text-red-600 text-xs">{errors.email?.message}</p>
          </div>
          <Button
            type="submit"
            className="mt-6 text-white"
            size="lg"
            color="amber"
            fullWidth
          >
            {t("CONTINUE")}
          </Button>
          <Typography color="black" className="text-xs my-2 text-center">
            {t("By continuing you agree to Jumia's")}
            <a href="#" className="block underline mt-1 text-orange-500">
              {t("Terms and Conditions")}
            </a>
          </Typography>
        </form>
        <div className="w-full md:w-[28rem]">
          <Button
            size="lg"
            variant="outlined"
            color="blue-gray"
            className="flex items-center justify-center mt-12 mb-8 "
            onClick={() => loginWithGoogle()}
            fullWidth
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              className="h-6 w-6"
            />
            {t("CONTINUE WITH GOOGLE")}
          </Button>
          <Typography color="black" className="text-sm text-center">
            {t(
              "For further support, you may visit the Help Center or contact our customer service team."
            )}
          </Typography>
          <div className="flex flex-col  items-center mt-5">
            <Image
              width="50"
              height="50"
              className="object-cover object-center"
              src={bottomLogo}
              alt="another-logo"
            />
          </div>
        </div>
      </Card>
    </>
  );
}

export default Login_signup;
export const loginSignup = (page) => page;
Login_signup.getLayout = loginSignup;

function Spinner() {
  return (
    <div
      role="status"
      className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
    >
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login"])),
      // Will be passed to the page component as props
    },
  };
}
