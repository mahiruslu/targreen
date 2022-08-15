import React from "react";
import { motion } from "framer-motion";
import Styles from "./Home.module.scss";
import Contact from "../Contact/Contact";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Brands from "../../components/Brands/Brands";

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
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={Styles.home_products_overview}
        >
          <Brands />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={Styles.home_wrapper}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
          odio rerum, eum ad ut animi qui iure temporibus harum exercitationem
          amet, laudantium voluptatem magni laboriosam saepe minus corporis
          necessitatibus sequi sint reiciendis, in aliquam incidunt eius beatae?
          Maxime nisi harum officia repudiandae adipisci. Quae provident
          quibusdam, deserunt a minima modi?
        </motion.div>
      </motion.div>
    </>
  );
}

export default Home;
