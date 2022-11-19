import classNames from "classnames";
import React, { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaCircleNotch,
  FaDashcube,
  FaSortAlphaDown,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";
import Styles from "./TreeView.module.scss";
import { motion } from "framer-motion";

function TreeView({ data, handleFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [categoryBodyIsOpen, setCategoryBodyIsOpen] = useState(
    window.innerWidth > 768
  );

  useEffect(() => {
    console.log(data, "data");
    let categoriesTemp = [];
    let categoriesFinal = [];

    categoriesTemp.push({ category: "All", subCategory: [] });

    data.map((product) => {
      if (
        categoriesTemp.filter((item) => {
          return item.category === product.category;
        }).length === 0
      ) {
        categoriesTemp.push({
          category: product.category,
          subCategory: [product.subcategory],
        });
      } else {
        if (
          categoriesTemp.filter((item) => {
            return (
              (item.category === product.category) &
              (item.subCategory.includes(product.subcategory) === false)
            );
          })
        ) {
          categoriesTemp
            .filter((item) => {
              return item.category === product.category;
            })[0]
            .subCategory.push(product.subcategory);
        }
      }
    });

    let uniquecategories = [...new Set(categoriesTemp)];
    uniquecategories.sort((a, b) => {
      if (a.category < b.category) {
        return -1;
      } else if (a.category > b.category) {
        return 1;
      } else {
        return 0;
      }
    });

    uniquecategories.map((option) => {
      categoriesFinal.push(option);
    });

    setCategories([...categoriesFinal]);
  }, []);

  const handleCategoryMenu = () => {
    setCategoryBodyIsOpen(!categoryBodyIsOpen);
  };

  return (
    <div className={Styles.treeview}>
      <div className={Styles.treeview_header} onClick={handleCategoryMenu}>
        <div className={Styles.treeview_header_left}>
          <FaCircleNotch />
          <h2 className={Styles.treeview_header_title}>Categories</h2>
        </div>
        <div className={Styles.treeview_header_right}>
          {categoryBodyIsOpen ? <FaSortDown /> : <FaSortUp />}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={classNames([
          Styles.treeview_body,
          {
            [Styles.treeview_body_active]: categoryBodyIsOpen,
          },
        ])}
      >
        {categories ? (
          categories.map((category, index) => {
            return (
              <div className={Styles.treeview_body_item} key={index}>
                <div className={Styles.treeview_body_item_header}>
                  <FaDashcube
                    className={Styles.treeview_body_item_header_icon}
                    onClick={() => console.log("sa")}
                  />
                  <h2
                    onClick={() =>
                      handleFilterChange(category.category, null, "category")
                    }
                  >
                    {category.category}
                  </h2>
                </div>
                {
                  <div className={Styles.treeview_body_item_body}>
                    {category.subCategory.map((subCategory, index) => {
                      return (
                        <div className={Styles.treeview_body_item_body_item}>
                          <div
                            className={Styles.treeview_body_item_body_item_icon}
                          >
                            <FaArrowRight />
                          </div>
                          <h3
                            className={
                              Styles.treeview_body_item_body_item_title
                            }
                            onClick={() =>
                              handleFilterChange(
                                category.category,
                                subCategory,
                                "subCategory"
                              )
                            }
                          >
                            {subCategory}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                }
              </div>
            );
          })
        ) : (
          <div>Null</div>
        )}
      </motion.div>
    </div>
  );
}

export default TreeView;
