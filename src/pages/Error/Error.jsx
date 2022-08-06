import React from "react";
import Styles from "./Error.module.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Error() {
  return (
    <motion.div
      className={Styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, bounce: 1 }}
    >
      <p className={Styles.message}>
        The page you're trying to reach is not exist. You can reach us if you
        want to know more about us!
      </p>

      <Link to="/contact" className={Styles.contact}>
        <span>Contact us</span>
      </Link>
    </motion.div>
  );
}

export default Error;
