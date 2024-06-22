import { AccountPageLayout } from "@/layouts/AccountLayout";
import CatProdList from "@/components/CatProdList/CatProdList";
import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
function RecentlyViewed({ catProducts }) {
  const { t } = useTranslation("common", "account");

  return (
    <div>
      <CatProdList catProducts={catProducts} />
    </div>
  );
}

export default RecentlyViewed;
RecentlyViewed.getLayout = AccountPageLayout;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "account", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
