import classNames from "classnames";
import React, { useEffect } from "react";
import Styles from "./Customers.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { costumers } from "../../../assets/data.json";

function Customers() {
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
          duration: 1,
          bounce: 0.5,
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
        className={classNames("container", [Styles.customers])}
      >
        <div className={Styles.customers_header}>
          <h1 className={Styles.customers_header_title}>
            Trusted by over 100 partners
          </h1>
          <p className={Styles.customers_header_paragraph}>
            We have a wide range of products that you can use. In every
            situation.
          </p>
        </div>
        <div className={Styles.customers_container}>
          {costumers.map((customer) => (
            <div className={Styles.customers_brand} key={customer}>
              {customer}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Customers;
