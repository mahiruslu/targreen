import classNames from "classnames";
import React, { useEffect } from "react";
import Styles from "./Products.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { products } from "../../../assets/data.json";

function Brands() {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });
  const [refItem, inViewItem] = useInView({
    threshold: 0.5,
  });

  const animation = useAnimation();
  const animationItem = useAnimation();

  useEffect(() => {
    if (inViewItem) {
      animationItem.start((i) => ({
        scale: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: i * 0.1 + 0.15,
        },
      }));
    } else {
      animationItem.start({
        scale: 0,
      });
    }
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.1,
        },
      });
    } else {
      animation.start({
        x: "100vw",
      });
    }
  }, [inViewItem, inView]);

  return (
    <div ref={ref} id="products">
      <div className={classNames("container", [Styles.products])}>
        <div ref={refItem} className={Styles.products_bottom}>
          {products.map((product, index) => (
            <div className={Styles.products_bottom_product}>
              <motion.div
                custom={index}
                animate={animationItem}
                key={index}
                className={Styles.products_bottom_product_name}
              >
                {product.title}
                <span></span>
              </motion.div>
            </div>
          ))}
        </div>
        <div ref={ref} className={Styles.products_top}>
          <motion.div
            animate={animation}
            className={Styles.products_top_product}
          >
            asdasdasdass
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Brands;
