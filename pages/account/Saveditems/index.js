import { AccountPageLayout } from "@/layouts/AccountLayout";
import React from "react";
import FavCard from "@/components/FavCard/FavCard";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
function SavedItem() {
  const { t } = useTranslation("common", "account");

  return (
    <>
      <div className="box-border sm:flex-col">
        <header className="py-2 px-4 font-bold">
          Saved Items ("number of fav product")
        </header>
        <div>
          <FavCard />
        </div>
      </div>
    </>
  );
}

export default SavedItem;
SavedItem.getLayout = AccountPageLayout;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "account", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
