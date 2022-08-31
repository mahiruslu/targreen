import React, { useState } from "react";
import Styles from "./About.module.scss";
import { motion } from "framer-motion";

import classNames from "classnames/bind";
import {
  toastifySuccess,
  ToastContainer,
  toastifyError,
} from "../../utils/hooks/useToastify";

function About() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, bounce: true }}
      className={Styles.page}
    >
      <div className={Styles.page_top}>
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
      </div>
      <div className={Styles.page_middle}>
        <div className={Styles.page_middle_left}></div>
        <div className={Styles.page_middle_right}>
          Our company, which was established in Altinekin, Konya by our
          agricultural engineer Bünyamin Tuncer in 1989, operates as project
          designing and wholesale marketing and has continued its activities in
          Konya since 1993. We started producing in our factory, which was
          established at the end of 2019. We have been producing sprinkler
          extension pipes in the field of agricultural irrigation for about 3
          years, and we continue on our way without giving up our reasonable
          prices and quality standards. By looking at the product quality and
          price suitability, we supply and sell the popular products of
          different brands within our own structure. We are currently
          manufacturer, supplier and seller. We offer solutions for agricultural
          irrigation, fertilization, projecting, engineering and production.
        </div>
      </div>
      <div className={Styles.page_bottom}>
        <div className={Styles.page_bottom_left}></div>
        <div className={Styles.page_bottom_right}></div>
      </div>
    </motion.div>
  );
}

export default About;
