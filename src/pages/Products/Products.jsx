import React, { useState, useEffect } from "react";
import Styles from "./Products.module.scss";
import { motion } from "framer-motion";
import classNames from "classnames/bind";
import {
  toastifySuccess,
  ToastContainer,
  toastifyError,
} from "../../utils/hooks/useToastify";

import { products as productsDb } from "../../assets/data.json";

import Select from "react-select";
import { FaArrowDown, FaSortDown } from "react-icons/fa";

import Announcements from "../../components/Products/Announcements/Announcements";
import TreeView from "../../components/Products/TreeView/TreeView";

function Products() {
  const [options, setOptions] = useState([]);
  const [products, setProducts] = useState([]);
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
    let optionsFinal = [];

    optionsTemp.push("All");
    productsDb.map((product) => {
      optionsTemp.push(product.category);
    });

    let uniqueOptions = [...new Set(optionsTemp)];

    uniqueOptions.map((option) => {
      optionsFinal.push({ value: option, label: option });
    });

    setOptions([...optionsFinal]);
    setProducts(productsDb);
  }, []);

  const handleFilterChange = (category, subCategory, type) => {
    console.log(category);
    if (type === "category") {
      if (category === "All") {
        setProducts(productsDb);
      } else {
        let filteredProducts = productsDb.filter((product) => {
          return product.category === category;
        });
        setProducts([...filteredProducts]);
      }
    } else if (type === "subCategory") {
      let filteredProducts = productsDb.filter((product) => {
        return (
          product.category === category && product.subcategory === subCategory
        );
      });
      setProducts([...filteredProducts]);
    }
  };

  const handleSortChange = (e) => {
    let sortedProducts = products.sort((a, b) => {
      if (e.value === "AZ") {
        return a.title > b.title ? 1 : -1;
      } else if (e.value === "ZA") {
        return a.title < b.title ? 1 : -1;
      }
    });

    setProducts([...sortedProducts]);
  };

  return (
    <div id="products" className={Styles.container}>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, bounce: true }}
        className={classNames(Styles.page, "container")}
      >
        {/* <div className={Styles.page_top}>{<Announcements />}</div> */}
        <div className={Styles.page_middle}>
          <div className={Styles.page_middle_left}>
            <TreeView
              data={productsDb}
              handleFilterChange={handleFilterChange}
            />
          </div>

          <div className={Styles.page_middle_right}>
            <div className={Styles.page_middle_right_top}>
              <div className={Styles.page_middle_right_top_left}>
                Showing {products.length} result{products.length > 1 && "s"}
              </div>
              <div className={Styles.page_middle_right_top_right}>
                {window.innerWidth < 768 && (
                  <Select
                    options={options}
                    onChange={(e) =>
                      handleFilterChange(e.value, null, "category")
                    }
                    placeholder="Filter"
                    className={Styles.page_middle_right_top_right_item}
                  />
                )}
                <Select
                  options={sortOptions}
                  onChange={handleSortChange}
                  placeholder="Sort"
                  className={Styles.page_middle_right_top_right_item}
                />
              </div>
            </div>
            <div className={Styles.page_middle_right_bottom}>
              {products.map((product, index) => (
                <motion.div
                  // custom={index}
                  // animate={animationItem}
                  className={Styles.page_middle_right_bottom_product}
                  key={index}
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
                        "/assets/images/products/placeholder.png";
                    }}
                    alt="product"
                    className={Styles.page_middle_right_bottom_product_image}
                  />
                  <div className={Styles.page_middle_right_bottom_product_info}>
                    <div
                      className={
                        Styles.page_middle_right_bottom_product_info_title
                      }
                    >
                      <h3>{product.title}</h3>
                      <h4>{product.brand}</h4>
                    </div>
                    <p>{product.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className={Styles.page_bottom}></div>
      </motion.div>
    </div>
  );
}

export default Products;
