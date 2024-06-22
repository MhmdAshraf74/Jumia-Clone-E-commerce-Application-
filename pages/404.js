import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export default function Error() {
  const { t } = useTranslation("common");
  return (
    <div className="w-full text-center flex flex-col md:flex-row justify-between items-center p-10 container mx-auto">
      <div className="text-start p-4">
        <h1 className="mb-2 text-lg font-bold">
          {t("Sorry Page Unavailable")}
        </h1>
        <p className="mb-2">
          {t("We couldn’t find the page you are looking for")}
        </p>
        <p className="mb-2">
          {t("But we have millions more shopping items for you to browse!")}
        </p>
        <Link href="/" className="btn btn-warning text-white mt-6 ">
          {t("GO TO HOMEPAGE")}
        </Link>
      </div>{" "}
      <Image
        src="https://www.jumia.com.eg/assets_he/images/people.9416a3fb.svg"
        width={500}
        height={700}
      />
    </div>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
