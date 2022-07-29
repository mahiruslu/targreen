import React from "react";
import { motion } from "framer-motion";
import Styles from "./Home.module.scss";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={Styles.home}
    >
      <p>asda</p>
    </motion.div>
  );
}

export default Home;
