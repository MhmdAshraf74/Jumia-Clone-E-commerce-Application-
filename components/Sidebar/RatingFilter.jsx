import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore, getProductsByCategoryId } from "../../firebase";
import RatingsGenerator from "./RatingsGenerator";
import Radio from "./Radio";
export default function RatingFilter({ setCatProducts, catId, subCatId }) {
  // const [storage, setStorage] = useState([]);

  // useEffect(() => {}, []);

  async function getData(subCatId, id) {
    try {
      //   const productsQuerySnapshot = await getDocs(
      //     collection(firestore, "products")
      //   );
      //   const productsData = productsQuerySnapshot.docs.map((doc) => ({
      //     id: doc.id,
      //     ...doc.data(),
      //   }));
      const productsData = await getProductsByCategoryId(catId);
      let data = productsData.filter((product) => product.rating >= Number(id)); // Filter products based on rating range
      if (subCatId) {
        data = data.filter((product) => product.subCategoryId === subCatId);
      }
      //   const filteredProducts = productsData.filter(
      //     (product) => product.rating >= Number(id))
      setCatProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const Ratings = RatingsGenerator();

  const handleRadioClick = (id) => {
    console.log(Number(id));
    getData(subCatId, id);
  };
  return (
    <div>
      {Ratings.map((option, index) => (
        <div key={index}>
          <Radio
            name="Group2"
            id={option.id}
            value={option.value}
            text={option.text}
            onClick={() => handleRadioClick(option.id)} // Attach event handler
          />
        </div>
      ))}
    </div>
  );
}
