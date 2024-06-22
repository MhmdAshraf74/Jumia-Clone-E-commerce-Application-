import Link from "next/link";
import React from "react";
import { useTranslation } from "next-i18next";

export default function ListItem({ children, onClick, id }) {
  const { t } = useTranslation("common");

  return (
    <>
      <li>
        <Link
          href={`/category/electronics/${children}`}
          className="text-gray-700 hover:bg-gray-200 block px-6"
          id={id}
          onClick={onClick}
        >
          {t(children)}
        </Link>
      </li>
    </>
  );
}
