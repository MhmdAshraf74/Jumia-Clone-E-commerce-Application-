import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import NestedCat from "./NestedCat";
import styles from "../../styles/RangeSlider.module.css";
import { getProductsByCategoryId } from "@/firebase";
import { useTranslation } from "next-i18next";

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider({ setCatProducts, catId, subCatId }) {
  const [value, setValue] = useState([20, 48000]);
  const { t } = useTranslation("common");
  const handleChange = (event, newValue) => {
    const updatedValue = Array.isArray(newValue)
      ? newValue.map((v) => Math.min(Math.max(v, 0), 48000))
      : Math.min(Math.max(newValue, 0), 10000);
    setValue(updatedValue);
  };

  const handleInputChange = (index) => (event) => {
    const newValue = parseInt(event.target.value);
    const updatedValue = [...value];
    updatedValue[index] = Math.min(Math.max(newValue, 0), 48000);
    setValue(updatedValue);
  };

  const handleSubmit = () => {
    getData(value, subCatId);
  };
  async function getData(value, subCatId) {
    // Receive value as a parameter
    try {
      const productsData = await getProductsByCategoryId(catId);
      let data = productsData.filter(
        (product) => product.price >= value[0] && product.price <= value[1]
      ); // Filter products based on price range
      if (subCatId) {
        data = data.filter((product) => product.subCategoryId === subCatId);
        console.log("hi");
      }
      console.log(data);
      setCatProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <Box>
      <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        <NestedCat>
          {t("PRICE")} ({t("EGP")})
        </NestedCat>
        <Box style={{ marginLeft: "auto" }}>
          <Button variant="text" color="warning" onClick={handleSubmit}>
            {t("APPLY")}
          </Button>
        </Box>
      </Box>
      <Slider
        className={`${styles.slider}`}
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={48000}
        color="warning"
      />
      <Box sx={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <Input
          className={`${styles.Input}`}
          type="number"
          value={value[0]}
          onChange={handleInputChange(0)}
          inputProps={{
            "aria-label": "Start Point",
            style: { textAlign: "center" },
          }}
        />
        <p className={`${styles.underScore}`}>_</p>
        <Input
          className={`${styles.Input}`}
          type="number"
          value={value[1]}
          onChange={handleInputChange(1)}
          inputProps={{
            "aria-label": "End Point",
            style: { textAlign: "center" },
          }}
        />
      </Box>
    </Box>
  );
}
