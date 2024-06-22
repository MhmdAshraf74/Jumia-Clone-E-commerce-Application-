import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/firebase";
import topLogo from "@/public/1.png";
import bottomLogo from "@/public/bottom-logo.png";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
function Login() {
  const { register, handleSubmit, formState } = useForm();
  const [storageProducts, setStorageProducts] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ password: "" });
  const router = useRouter();
  const { t } = useTranslation("login");

  const { login: email } = router.query;

  useEffect(() => {
    setStorageProducts(JSON.parse(localStorage.getItem("cart")));
  }, []);

  async function userLogin({ password }) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(true);
        // If there cart in local storage set it in him firestore cart collection.
        if (storageProducts) {
          setDoc(doc(firestore, "cart", userCredential.user.uid), {
            products: [...storageProducts],
          });
          // Remove it from local storage.
          localStorage.removeItem("cart");
        }
        setTimeout(() => {
          setLoading(false);
          router.push("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        if (err.code) {
          setErrors({ ...errors, password: "Password Wrong" });
        }
      });
  }

  return (
    <Card
      className="flex flex-col items-center pt-10 h-screen px-3"
      shadow={false}
    >
      <div className="flex flex-col items-center w-full  md:w-[30rem]">
        <Image
          width={120}
          height={120}
          className="object-cover object-center mb-3"
          src={topLogo}
          alt="logo-image"
        />
        <Typography variant="h3" color="black">
          {t("Welcome back.")}
        </Typography>
        <Typography color="black" className="mt-1 text-center">
          {t("Log back into your Jumia account.")}
        </Typography>
      </div>
      <form
        className="mb-20 w-full md:w-[28rem]"
        onSubmit={handleSubmit(userLogin)}
      >
        <div className="w-full md:w-[28rem] mt-20">
          <Input
            size="lg"
            value={email}
            {...register("email")}
            disabled
            color="orange"
            label="Enter your email"
            fullWidth
          />
        </div>
        <div className="w-full md:w-[28rem] my-10">
          <Input
            type="password"
            size="lg"
            fullWidth
            onClick={() => {
              setErrors({ ...errors, password: "" });
            }}
            color={errors.password ? "red" : "orange"}
            label={t("Password")}
            {...register("password", {
              required: true,
              minLength: { value: 8, message: "Must be 8 characters." },
            })}
          />
          <p className="text-red-600 text-xs">
            {formState.errors.password?.message}
          </p>
          <p className="text-red-600 text-xs">{errors.password}</p>
        </div>
        <Button
          type="submit"
          className="mt-6 text-white"
          size="lg"
          loading={isLoading}
          color="amber"
          fullWidth
        >
          {t("CONTINUE")}
        </Button>
      </form>
      <div className=" w-full md:w-[28rem]">
        <Typography color="black" className="text-sm text-center px-3">
          {t(
            "For further support, you may visit the Help Center or contact our customer service team."
          )}
        </Typography>
        <div className="flex flex-col  items-center mt-5">
          <Image
            width="70"
            height="70"
            className="object-cover object-center"
            src={bottomLogo}
            alt="another-logo"
          />
        </div>
      </div>
    </Card>
  );
}

export default Login;
export const loginSignup = (page) => page;
Login.getLayout = loginSignup;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login"])),
      // Will be passed to the page component as props
    },
  };
}
