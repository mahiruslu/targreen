import React, { useState, useEffect } from "react";
import Styles from "./Admin.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { workers } from "../../assets/data.json";

import { db, storage } from "../../utils/hooks/useFirebase";
import { onValue, ref } from "firebase/database";
import { getDownloadURL, ref as storageRef, listAll } from "firebase/storage";

import { ToastContainer } from "../../utils/hooks/useToastify";

import WorkerModal from "./Components/WorkerModal";

import classNames from "classnames/bind";
import ProductModal from "./Components/ProductModal";

function Admin() {
  const [refItem, inViewItem] = useInView({
    threshold: 0.1,
  });

  const animationItem = useAnimation();

  useEffect(() => {
    if (inViewItem) {
      animationItem.start((i) => ({
        scale: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: i * 0.1 + 0.1,
        },
      }));
    } else {
      animationItem.start({
        scale: 0,
      });
    }
  }, [inViewItem]);

  useEffect(() => {
    const query = ref(db);

    return onValue(
      query,
      (snapshot) => {
        const data = snapshot.val();

        if (snapshot.exists()) {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, bounce: true }}
      className={classNames("container", [Styles.page])}
    >
      <div className={Styles.page_top}>
        <h2>Admin Panel</h2>
      </div>
      <div className={Styles.page_middle}>
        <div className={Styles.page_middle_left}></div>
        <div className={Styles.page_middle_right}>
          <div className="m-1">
            <WorkerModal />
          </div>
          <div className="m-1">
            <ProductModal />
          </div>
        </div>
      </div>
      <div className={Styles.page_bottom}>
        <div className={Styles.page_bottom_top}>
          <h2></h2>
          <p> </p>
        </div>
        <div ref={refItem} className={Styles.page_bottom_bottom}></div>
      </div>
      <ToastContainer draggablePercent={60} />
    </motion.div>
  );
}

export default Admin;
