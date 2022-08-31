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
        scale: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: 0.3,
        },
      });
    } else {
      animationBrands.start({
        scale: 0,
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
          <div className={Styles.brands_brand} key={brand}>
            {brand}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Brands;
