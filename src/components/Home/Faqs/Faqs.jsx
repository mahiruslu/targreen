import classNames from "classnames";
import React, { useEffect } from "react";
import Styles from "./Faqs.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { faqs } from "../../../assets/data.json";
import Accordion from "../../../components/Home/Faqs/Accordion";

function Faqs() {
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
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.1,
        },
      });
    } else {
      animation.start({
        x: "-100vw",
      });
    }
  }, [inViewItem, inView]);

  return (
    <div className={Styles.container}>
      <div ref={ref} className={classNames("container", [Styles.faqs])}>
        <motion.div animate={animation} className={Styles.faqs_top}>
          <h4 className={Styles.faqs_top_title}>FAQs</h4>
          <h3 className={Styles.faqs_top_title_sub}>
            Frequently asked questions.
          </h3>
          <p>Have questions? We are here to help.</p>
        </motion.div>
        <div ref={refItem} className={Styles.faqs_middle}>
          <Accordion data={faqs} />
        </div>
        <div ref={refItem} className={Styles.faqs_bottom}>
          <h4 className={Styles.faqs_bottom_title}>Still have questions?</h4>
          <h3 className={Styles.faqs_bottom_title_sub}>
            Can't find the answer you looking for? Please contact us.
          </h3>
          <Link to="/contact" className={Styles.faqs_bottom_link}>
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Faqs;
