import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Styles from "./Products.module.scss";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { product_groups } from "../../../assets/data.json";

function Products() {
  const [ref, inView] = useInView({
    threshold: 0.2,
  });
  const [refItem, inViewItem] = useInView({
    threshold: 0.2,
  });

  const animation = useAnimation();
  const animationItem = useAnimation();
  const animationImage = useAnimation();

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
        scale: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: 0.3,
        },
      });
    } else {
      animation.start({
        scale: 0,
      });
    }
  }, [inViewItem, inView]);

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    animationImage.set({ opacity: 0, scale: 0.75 });
    animationImage.start({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 2,
        bounce: 0.4,
      },
    });
  }, [selected]);

  return (
    <div ref={ref} id="products" className={Styles.container}>
      <div className={classNames("container", [Styles.products])}>
        <div ref={refItem} className={Styles.products_bottom}>
          {product_groups.map((product, index) => (
            <div
              className={Styles.products_bottom_product}
              onClick={() => setSelected(index)}
              onMouseEnter={() => setSelected(index)}
              key={index}
            >
              <motion.div
                custom={index}
                animate={animationItem}
                className={classNames([
                  Styles.products_bottom_product_name,
                  {
                    [Styles.products_bottom_product_name_selected]:
                      selected === index,
                  },
                ])}
              >
                {product.name}
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
            <div className={Styles.products_top_product_desc}>
              {product_groups[selected].desc}
            </div>
            <motion.div
              animate={animationImage}
              className={Styles.products_top_product_image}
            >
              <img
                src={
                  window.location.origin +
                  "/assets/images/products/" +
                  product_groups[selected].image
                }
                alt={product_groups[selected].name}
                loading="lazy"
              />
            </motion.div>
            <p>Click the image to see products</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Products;
