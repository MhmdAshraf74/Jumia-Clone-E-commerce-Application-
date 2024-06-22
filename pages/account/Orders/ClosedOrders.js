import { AccountPageLayout } from "@/layouts/AccountLayout";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavCard from "@/components/FavCard/FavCard";

function ClosedOrders() {
  return (
    <>
      <div className="  ">
        <header className="py-2 border-b px-4">
          <h2 className="font-bold">ORDERS</h2>
        </header>
        <div className="py-4     h-[80%] ">
          <div className=" border-b  p-2 flex flex-col md:flex-row  ">
            <Link
              className="px-4 hover:text-orange-400 "
              href="/account/Orders"
            >
              ONGOING/DELIVERED (0)
            </Link>
            <Link
              className="px-4 hover:text-orange-400  mt-2 md:mt-0"
              href="/account/Orders/ClosedOrders"
            >
              CANCELED/RETURNED (2)
            </Link>
          </div>
        </div>
        <FavCard />
      </div>
    </>
  );
}

export default ClosedOrders;
ClosedOrders.getLayout = AccountPageLayout;
