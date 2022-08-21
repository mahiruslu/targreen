import classNames from "classnames";
import React, { useEffect } from "react";
import Styles from "./Brands.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { brands } from "../../../assets/data.json";

function Brands() {
  const [refBrands, inViewBrands] = useInView({
    threshold: 0.2,
  });

  const animationBrands = useAnimation();

  useEffect(() => {
    if (inViewBrands) {
      animationBrands.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.5,
        },
      });
    } else {
      animationBrands.start({
        x: "-100vw",
      });
    }
  }, [inViewBrands]);

  return (
    <div ref={refBrands}>
      <motion.div
        animate={animationBrands}
        className={classNames("container", [Styles.brands])}
      >
        {brands.map((brand) => (
          <div className={Styles.brands_brand}>{brand}</div>
        ))}
      </motion.div>
    </div>
  );
}

export default Brands;
