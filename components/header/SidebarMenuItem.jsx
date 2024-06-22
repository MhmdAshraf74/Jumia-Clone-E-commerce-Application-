import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function SidebarMenuItem({ link, text, Icon, active }) {
  const { t } = useTranslation("home");
  return (
    <div
      className="hoverEffect flex items-center text-gray-700 justify-start text-sm space-x-3
     hover:bg-gray-200 rounded-full"
    >
      <Link href={`/category/${link}`}>
        <Icon className="h-7" />
        <span className={`${active && "font-bold"} inline`}>{text}</span>
      </Link>
    </div>
  );
}
