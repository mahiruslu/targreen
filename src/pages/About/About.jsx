import React, { useState, useEffect } from "react";
import Styles from "./About.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { workers } from "../../assets/data.json";

import classNames from "classnames/bind";
import {
  toastifySuccess,
  ToastContainer,
  toastifyError,
} from "../../utils/hooks/useToastify";

function About() {
  const [refItem, inViewItem] = useInView({
    threshold: 0.1,
  });

  const animationItem = useAnimation();

  useEffect(() => {
    if (inViewItem) {
      animationItem.start((i) => ({
        scale: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: i * 0.1 + 0.1,
        },
      }));
    } else {
      animationItem.start({
        scale: 0,
      });
    }
  }, [inViewItem]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, bounce: true }}
      className={classNames("container", [Styles.page])}
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
        <div className={Styles.page_bottom_top}>
          <h2>Meet our team</h2>
          <p>
            Our mission is to provide the best quality products and services to
            our customers with high qualified and professional teammates.
          </p>
        </div>
        <div ref={refItem} className={Styles.page_bottom_bottom}>
          {workers.map((worker, index) => (
            <motion.div
              custom={index}
              animate={animationItem}
              className={Styles.page_bottom_bottom_worker}
              key={worker.name}
            >
              <img
                src={
                  window.location.origin +
                  "/assets/images/workers/" +
                  worker.image
                }
                onError={(e) => {
                  e.target.src =
                    window.location.origin +
                    "/assets/images/workers/worker.jpeg";
                }}
                alt="worker"
                className={Styles.page_bottom_bottom_worker_image}
              />
              <div className={Styles.page_bottom_bottom_worker_info}>
                <div className={Styles.page_bottom_bottom_worker_info_title}>
                  <h3>{worker.name}</h3>
                  <h4>{worker.title}</h4>
                </div>
                <p>{worker.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default About;
