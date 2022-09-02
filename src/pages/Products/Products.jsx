import React, { useState, useEffect } from "react";
import Styles from "./Products.module.scss";
import { motion } from "framer-motion";
import classNames from "classnames/bind";
import {
  toastifySuccess,
  ToastContainer,
  toastifyError,
} from "../../utils/hooks/useToastify";

import { products } from "../../assets/data.json";

import Select from "react-select";
import { FaArrowDown, FaSortDown } from "react-icons/fa";

import Announcements from "../../components/Products/Announcements";

function Products() {
  const [options, setOptions] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sortOptions = [
    { value: "AZ", label: "A-Z" },
    { value: "ZA", label: "Z-A" },
  ];

  useEffect(() => {
    let optionsTemp = [];
    products.map((product) => {
      optionsTemp.map((option) => {
        if (option.value === product.category) {
          return;
        } else {
          return optionsTemp.push({
            value: product.category,
            label: product.category,
          });
        }
      });
    }),
      setOptions(optionsTemp);
  }, []);

  return (
    <div id="products" className={Styles.container}>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, bounce: true }}
        className={Styles.page}
      >
        <div className={Styles.page_top}>{/* <Announcements /> */}</div>
        <div className={Styles.page_middle}>
          <div className={Styles.page_middle_top}>
            <div className={Styles.page_middle_top_left}>
              Showing {products.length} results
            </div>
            <div className={Styles.page_middle_top_right}>
              <div className={Styles.page_middle_top_filter}>
                <Select options={options} />
              </div>
              <div className={Styles.page_middle_top_sort}>
                <Select options={sortOptions} />
              </div>
            </div>
          </div>
          <div className={Styles.page_middle_bottom}>
            {products.map((product, index) => (
              <motion.div
                // custom={index}
                // animate={animationItem}
                className={Styles.page_middle_bottom_product}
                key={product.name}
              >
                <img
                  src={
                    window.location.origin +
                    "/assets/images/products/" +
                    product.image
                  }
                  onError={(e) => {
                    e.target.src =
                      window.location.origin +
                      "/assets/images/products/placeHolder.png";
                  }}
                  alt="product"
                  className={Styles.page_middle_bottom_product_image}
                />
                <div className={Styles.page_middle_bottom_product_info}>
                  <div className={Styles.page_middle_bottom_product_info_title}>
                    <h3>{product.title}</h3>
                    <h4>{product.brand}</h4>
                  </div>
                  <p>{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className={Styles.page_bottom}></div>
      </motion.div>
    </div>
  );
}

export default Products;
