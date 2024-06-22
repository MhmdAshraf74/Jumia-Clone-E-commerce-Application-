import { getSearch } from "@/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Breadcrumbs } from "@material-tailwind/react";
import CatProdList from "@/components/CatProdList/CatProdList";
import MySpinner from "@/components/order/Spiner/Spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";

function allProducts() {
  const [loading, setLoading] = useState(true);
  const [allQueryProducts, setAllQueryProducts] = useState([]);
  const convertQuerySnapshotToProducts = Array();
  const { t } = useTranslation("common");
  const router = useRouter();
  const { queryString } = router.query;
  useEffect(() => {
    getSearch(queryString).then((data) => {
      data.map((product) => {
        convertQuerySnapshotToProducts.push(product.data());
      });
      setAllQueryProducts([...convertQuerySnapshotToProducts]);
      setLoading(false);
    });
  }, [queryString]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MySpinner />
      </div>
    );
  } else {
    return (
      <main className="container mx-auto">
        <div className="grid grid-cols-12 gap-2">
          <div className=" col-span-12 md:col-span-12 py-2">
            <CatProdList
              catProducts={allQueryProducts}
              catData={t("All Products")}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default allProducts;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav"])),
      // Will be passed to the page component as props
    },
  };
}
