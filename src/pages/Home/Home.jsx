import React from "react";
import { motion } from "framer-motion";
import Styles from "./Home.module.scss";

function Home() {
  return (
    <>
      <section className="banner-home">
        <div className="container">
          <motion.div
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={Styles.home}
          >
            <h1 className="text-3xl font-bold underline">
              Hello world!
            </h1>
            <h2>We take farming, irrigation, and spraying to the next level</h2>
          </motion.div>

        </div>
      </section>
      <section>
        <div className="container">
          <h2>Products</h2>
        </div>
      </section>
    </>
  );
}

export default Home;
