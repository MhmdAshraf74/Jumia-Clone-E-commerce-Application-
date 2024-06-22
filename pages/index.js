import Header from "@/components/header/header";
import Electronics from "@/components/recommended/electronics";
import SliderMainPage from "@/components/slider";
import Recommended from "@/components/recommended/recommended";
import Supermarket from "@/components/recommended/supermarket";
import HealthPersonalCare from "@/components/recommended/HealthPersonalCare";
import OfficeSupplies from "@/components/recommended/OfficeSupplies";
import Watches from "@/components/recommended/watches";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <>
      <main className=" mx-auto p-2 lg:container">
        <Header />
        <Recommended />
        <SliderMainPage />
        <Watches />
        <Electronics />
        <Supermarket />
        <HealthPersonalCare />
        <OfficeSupplies />
      </main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
