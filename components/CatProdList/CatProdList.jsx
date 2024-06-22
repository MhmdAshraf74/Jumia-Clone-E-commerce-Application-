import { useTranslation } from "next-i18next";
import CatProdCard from "../card/MyCard";

function CatProdList({ catProducts, catData, subCatData }) {
  const { t } = useTranslation("common");
  if (!catProducts) {
    return <div>nothing to show</div>;
  } else {
    return (
      <>
        <div className="bg-white">
          <p className="p-3 text-black text-xl">
            {t(catData)}
            {subCatData ? ` / ${t(subCatData)}` : ""}{" "}
          </p>
          <hr />
          <p className="p-3">
            {t("products found") + " " + catProducts.length}
          </p>
          <hr />
          <div className="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-2 md:gap-2 sm:grid-cols-1 sm:gap-1">
            {catProducts.map((product) => {
              return <CatProdCard key={product.proId} cardData={product} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default CatProdList;
