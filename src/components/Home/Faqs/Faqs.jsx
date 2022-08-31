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
    threshold: 0.1,
  });

  const animation = useAnimation();

  useEffect(() => {
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
  }, [inView]);

  return (
    <div ref={ref} className={Styles.container}>
      <motion.div
        animate={animation}
        className={classNames("container", [Styles.faqs])}
      >
        <div className={Styles.faqs_top}>
          <h4 className={Styles.faqs_top_title}>FAQs</h4>
          <h3 className={Styles.faqs_top_title_sub}>
            Frequently asked questions.
          </h3>
          <p>Have questions? We are here to help.</p>
        </div>
        <div className={Styles.faqs_middle}>
          <Accordion data={faqs} />
        </div>
        <div className={Styles.faqs_bottom}>
          <h4 className={Styles.faqs_bottom_title}>Still have questions?</h4>
          <h3 className={Styles.faqs_bottom_title_sub}>
            Can't find the answer you looking for? Please contact us.
          </h3>
          <Link to="/contact" className={Styles.faqs_bottom_link}>
            Contact us
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Faqs;
