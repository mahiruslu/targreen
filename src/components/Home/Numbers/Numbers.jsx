import classNames from "classnames";
import React, { useEffect } from "react";
import Styles from "./Numbers.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Numbers() {
  const [refItem, inViewItem] = useInView({
    threshold: 0.5,
  });

  const animation = useAnimation();

  useEffect(() => {
    if (inViewItem) {
      animation.start((i) => ({
        scale: 1,
        transition: {
          type: "spring",
          duration: 1,
          bounce: i * 0.1 + 0.5,
        },
      }));
    } else {
      animation.start({
        scale: 0,
      });
    }
  }, [inViewItem]);

  const numbers = [
    { name: "Irrigation System Installations", number: 120 },
    { name: "Team Members", number: 16 },
    { name: "Successful Projects", number: 250 },
    { name: "Years of Experience", number: 15 },
  ];
  return (
    <div className={classNames("container", [Styles.numbers])}>
      <div className={Styles.numbers_left}>
        <h3 className={Styles.number_left_title}>Tar-Green</h3>
        <p>
          We provide everything from new construction irrigation design and
          installation to maintenance for residential and commercial properties.
        </p>
        <p>
          We are one of only a few that truly specialize in irrigation. If
          you’re a detail minded person, our attention to detail far exceeds the
          rest. Our design standards, high quality workmanship, vast knowledge
          of cutting edge smart technology, expertise, and honesty sets us
          apart.
        </p>
      </div>
      <div ref={refItem} className={Styles.numbers_right}>
        {numbers.map((number, index) => (
          <motion.div
            custom={index}
            animate={animation}
            key={index}
            className={Styles.numbers_right_item}
          >
            <span>{number.number}</span>
            <span>{number.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Numbers;
