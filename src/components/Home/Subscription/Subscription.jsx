import classNames from "classnames";
import React, { useEffect } from "react";
import Styles from "./Subscription.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { brands } from "../../../assets/data.json";
import { FaMailBulk, FaMailchimp } from "react-icons/fa";
import {
  toastifySuccess,
  ToastContainer,
  toastifyError,
} from "../../../utils/hooks/useToastify";

function Subscription() {
  const [ref, inView] = useInView({
    threshold: 0.2,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    toastifySuccess("Subscribed Successfully");
  };

  return (
    <div ref={ref} className={Styles.container}>
      <motion.div
        animate={animation}
        className={classNames("container", [Styles.subscription])}
      >
        <div className={Styles.subscription_header}>
          <h2 className={Styles.subscription_header_title}>
            Subscribe to our newsletter
          </h2>
          <p className={Styles.subscription_header_desc}>
            Get the latest news and updates on our products, and services. We
            hate spam too, so don't worry about it.
          </p>
        </div>
        <div className={Styles.subscription_form}>
          <form
            className={Styles.subscription_form_form}
            onSubmit={handleSubmit}
          >
            {/* <FaMailBulk className={Styles.subscription_form_form_icon} /> */}
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className={Styles.subscription_form_form_input}
            />
            <button className={Styles.subscription_form_form_button}>
              Subscribe
            </button>
          </form>
        </div>
      </motion.div>
      <ToastContainer draggablePercent={60} />
    </div>
  );
}

export default Subscription;
