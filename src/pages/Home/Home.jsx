import React, { Suspense, useEffect } from "react";
import Styles from "./Home.module.scss";
import Contact from "../Contact/Contact";
import Button from "../../components/Home/Button/Button";
import { useNavigate } from "react-router-dom";
import Brands from "../../components/Home/Brands/Brands";
import Loader from "../../components/Loader/Loader";
import Numbers from "../../components/Home/Numbers/Numbers";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  const handleGoToProducts = () => {
    navigate("/products");
  };

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
          className={Styles.home_welcome}
        >
          <h1>Welcome to targreen</h1>
          <h2>We take farming, irrigation, and spraying to the next level</h2>
          <p>Unlimited solutions for your farming needs.</p>
          <Button onClick={handleGoToProducts}>See Products</Button>
        </motion.div>
        <div className={Styles.home_products_overview}>
          <Brands />
        </div>
        <div className={Styles.home_wrapper}>
          <Numbers />
        </div>
      </motion.div>
    </>
  );
}

export default Home;
