import React from "react";
import Styles from "./Contact.module.scss";
import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, bounce: true }}
      className={Styles.contact}
    >
      hello
    </motion.div>
  );
}

export default Contact;
