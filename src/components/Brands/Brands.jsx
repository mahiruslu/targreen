import React from "react";
import Styles from "./Brands.module.scss";

function Brands() {
  const brands = ["tarsu", "şusu", "busu", "o da su", "alla alla bu da mı su"];
  return (
    <div className={Styles.brands}>
      {brands.map((brand) => (
        <div className={Styles.brands_brand}>{brand}</div>
      ))}
    </div>
  );
}

export default Brands;
