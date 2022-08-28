import React, { useState } from "react";
import Styles from "./About.module.scss";
import Loader from "../../components/Loader/Loader";
import { motion } from "framer-motion";

import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import {
  toastifySuccess,
  ToastContainer,
  toastifyError,
} from "../../utils/hooks/useToastify";

function About() {
  return (
    <motion.div
      initial={{ y: 20, scale: 0, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 1, bounce: true, ease: "easeInOut" }}
      className={Styles.page}
    >
      <div className={Styles.page_left}></div>
      <div className={Styles.page_right}></div>
    </motion.div>
  );
}

export default About;
