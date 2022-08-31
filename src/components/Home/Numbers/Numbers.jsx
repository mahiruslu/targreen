import classNames from "classnames";
import React, { useEffect } from "react";
import Styles from "./Numbers.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { numbers } from "../../../assets/data.json";

function Numbers() {
  const [ref, inView] = useInView({
    threshold: 0.2,
  });
  const [refItem, inViewItem] = useInView({
    threshold: 0.2,
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
          bounce: i * 0.1 + 0.5,
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

  return (
    <div className={Styles.container}>
      <div ref={ref} className={classNames("container", [Styles.numbers])}>
        <motion.div animate={animation} className={Styles.numbers_left}>
          <h3 className={Styles.numbers_left_title}>TAR GREEN</h3>
          <p className={Styles.numbers_left_desc}>
            We provide everything from new construction irrigation design and
            installation to maintenance for residential and commercial
            properties. We are one of only a few that truly specialize in
            irrigation. If you’re a detail minded person, our attention to
            detail far exceeds the rest. Our design standards, high quality
            workmanship, vast knowledge of cutting edge smart technology,
            expertise, and honesty sets us apart.
          </p>
        </motion.div>
        <div ref={refItem} className={Styles.numbers_right}>
          {numbers.map((number, index) => (
            <motion.div
              custom={index}
              animate={animationItem}
              key={index}
              className={Styles.numbers_right_item}
            >
              <span>{number.number}</span>
              <span>{number.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Numbers;
