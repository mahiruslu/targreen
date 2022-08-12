import React from "react";
import { motion } from "framer-motion";
import Styles from "./Home.module.scss";
import Contact from "../Contact/Contact";
import Button from "../../components/Button/Button";

function Home() {
  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className={Styles.home}
      >
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={Styles.home_wrapper}
        >
          <h1>Welcome to targreen</h1>
          <h2>We take farming, irrigation, and spraying to the next level</h2>
          <p>Unlimited solutions for your farming needs.</p>
          <Button>See Products</Button>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Home;
