import React from "react";
import ListReview from "./[ListReview]";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "account", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
export default function FeedbackList() {
  return (
    <div className="flex justify-center items-center py-5">
      <div className="bg-white rounded">
        <ListReview />
      </div>
    </div>
  );
}
