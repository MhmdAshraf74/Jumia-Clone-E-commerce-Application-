import React from "react";
import Services from "../components/Services/Services";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export default function helper() {
  return (
    <>
      <Services />
    </>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["help"])),
      // Will be passed to the page component as props
    },
  };
}
