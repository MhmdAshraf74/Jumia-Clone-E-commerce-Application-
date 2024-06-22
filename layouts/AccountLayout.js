import Link from "next/link";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useTranslation } from "next-i18next";
const AccountLayout = ({ children }) => {
  const { t } = useTranslation("common", "nav");
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-2 grid gap-3 md:grid-cols-12  ">
        <div className="bg-white flex flex-col col-span-12  md:col-span-4 rounded-md  hover:bg-stone-300  ">
          <Link
            href="/account/JumiaAccount"
            className="py-3 px-4 hover:bg-orange-300 "
          >
            <PersonOutlineIcon className="me-4" />
            {t("My Jumia Account")}
          </Link>
          <Link
            href="/account/Orders"
            className=" py-3 px-4 hover:bg-orange-300"
          >
            <ShoppingBagOutlinedIcon className="me-4" />
            {t("Orders")}
          </Link>

          <Link
            href="/account/pendingReview"
            className=" py-3 px-4 hover:bg-orange-300"
          >
            <RateReviewOutlinedIcon className="w-6 h-6 me-4" />
            {t("Pending Reviews")}
          </Link>

          <Link
            href="/account/Saveditems"
            className=" py-3 px-4 hover:bg-orange-300"
          >
            <FavoriteBorderOutlinedIcon className="me-4" />
            {t("Saved Item")}
          </Link>

          <Link
            href="/account/recentlyViewed"
            className=" py-3 px-4 hover:bg-orange-300"
          >
            <RestoreOutlinedIcon className="me-4" />
            {t("Recently Viewed")}
          </Link>
          <Link
            href="/UserManagment/basic-details/show"
            className=" p-3 hover:bg-orange-300"
          >
            {t("Account Management")}
          </Link>
          <Link
            href="/account/AddressBook"
            className=" p-3 hover:bg-orange-300"
          >
            {t("Address Book")}
          </Link>
          <button className="text-yellow-500 hover:bg-orange-300 rounded-lg m-4 p-2">
            {t("LOGOUT")}
          </button>
        </div>
        <div className="bg-white mt-2 md:mt-0   px-2 col-span-12  md:col-span-8  ">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountLayout;
export const AccountPageLayout = (page) => (
  <AccountLayout>{page}</AccountLayout>
);
AccountLayout.getLayout = AccountPageLayout;
