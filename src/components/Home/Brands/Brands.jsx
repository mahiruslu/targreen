import classNames from "classnames";
import React, { useEffect } from "react";
import Styles from "./Brands.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

  const brands = ["tarsu", "şusu", "busu", "o da su", "alla alla bu da mı su"];

  return (
    <div ref={refBrands}>
      <motion.div
        ref={refBrands}
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
