import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import WatchIcon from "@mui/icons-material/Watch";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import CableIcon from "@mui/icons-material/Cable";
import SidebarMenuItem from "./SidebarMenuItem";
import { useTranslation } from "next-i18next";

export default function Leftside() {
  const { t } = useTranslation("home");
  return (
    <div className="hidden md:inline md:w-[40%] lg:w-[20%] ">
      <div className="items-start bg-white p-2 h-[100%] rounded-md shadow-2xl">
        <SidebarMenuItem
          link="supermarket"
          text={t("Supermarket")}
          Icon={LocalGroceryStoreIcon}
          active
        />
        <SidebarMenuItem
          link="healthbeauty"
          text={t("Health & Beauty")}
          Icon={MedicationLiquidIcon}
        />
        <SidebarMenuItem
          link="officesupplies"
          text={t("Office Supplies")}
          Icon={HomeWorkIcon}
        />
        <SidebarMenuItem link="watches" text={t("Watches")} Icon={WatchIcon} />
        <SidebarMenuItem
          link="perfumes"
          text={t("Perfumes")}
          Icon={FilterVintageIcon}
        />
        <SidebarMenuItem
          link="kindle"
          text={t("Kindles")}
          Icon={WhatshotOutlinedIcon}
        />
        <SidebarMenuItem
          link="electronics"
          text={t("Electronics")}
          Icon={CableIcon}
        />
      </div>
    </div>
  );
}
