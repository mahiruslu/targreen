import React from "react";
import { motion } from "framer-motion";
import Styles from "./Home.module.scss";
import Projects from "./components/Projects";

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
      <Projects />
    </>
  );
}

export default Home;
