import React, { useState, useEffect } from "react";
import Styles from "./Admin.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { workers } from "../../assets/data.json";

import { db, storage } from "../../utils/hooks/useFirebase";
import { onValue, ref } from "firebase/database";
import { getDownloadURL, ref as storageRef, listAll } from "firebase/storage";

import {
  FaUpload,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";

import { TextInput, Checkbox, Button, Group, Box,Text  } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';

import WorkerModal from "./Components/WorkerModal";

import classNames from "classnames/bind";

function Admin() {
  const [refItem, inViewItem] = useInView({
    threshold: 0.1,
  });
  
  const [selectedOption, setSelectedOption] = useState([]);
  // const [imageUrls, setImageUrls] = useState([]);

  // const imagesListRef = storageRef(storage, "workers/");
  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {

  //     response.items.forEach((item) => {
  //       console.log(item, "item");
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  //   console.log(imageUrls);
  //   imageUrls.find((item) => {
  //       console.log(item, "item");
  //     item === "https://firebasestorage.googleapis.com/v0/b/targreen-1f1d9.appspot.com/o/workers%2Fmustafa.png?alt=media&token=f3a60de1-fc0b-4ab1-84dd-1817eabc2bbc"})
  // }, []);

  useEffect(() => {
    const query = ref(db);

    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      
      if (snapshot.exists()) {
      }
    }, (error) => {
      console.log(error);
    });
  }, []);




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

  
  // 

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
        <WorkerModal />
          
        </div>
      </div>
      <div className={Styles.page_bottom}>
        <div className={Styles.page_bottom_top}>
          <h2></h2>
          <p> </p>
        </div>
        <div ref={refItem} className={Styles.page_bottom_bottom}>
        </div>
      </div>
    </motion.div>
  );
}

export default Admin;
