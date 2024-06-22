import React, { useState } from "react";
import Category from "./Category";
import NestedCat from "./NestedCat";
import List from "./List";
import ListItem from "./ListItem";
import RangeSlider from "./RangeSlider";
import RatingFilter from "./RatingFilter";
import { useTranslation } from "next-i18next";

export default function Sidebar({
  catData,
  subCats,
  setCatProducts,
  id,
  subCatId,
}) {
  const checkedItems = false;
  const { t } = useTranslation("common");
  console.log(subCats);
  const handleChange = (id) => {
    checkedItems != checkedItems;
  };
  return (
    <div>
      <Category>
        <NestedCat>{t("CATEGORY")}</NestedCat>
        <List>
          <NestedCat>{t(catData)}</NestedCat>
          {subCats
            ? subCats.map((category, index) => (
                <ListItem key={index}>{category.name}</ListItem>
              ))
            : ""}
        </List>
        <br />
        <hr />
        <RangeSlider
          setCatProducts={setCatProducts}
          catId={id}
          subCatId={subCatId}
        />
        <List
          style={{
            maxHeight: "100px",
            overflowY: "scroll",
            scrollbarColor: "#d4d4d6 transparent",
            scrollbarWidth: "thin",
            marginTop: "10px",
          }}
        ></List>
        <br />
        <hr />
        <NestedCat>{t("PRODUCT RATING")}</NestedCat>
        <List>
          <RatingFilter
            setCatProducts={setCatProducts}
            catId={id}
            subCatId={subCatId}
          />
        </List>
      </Category>
    </div>
  );
}
