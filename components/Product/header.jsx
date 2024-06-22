import React from "react";
import { useTranslation } from "next-i18next";

export default function Header({ title, color }) {
  const { t } = useTranslation("common");
  return (
    <div
      className={`${color} p-1 text-xl text-white bg-amber-500
     uppercase text-center`}
    >
      {title}
    </div>
  );
}
