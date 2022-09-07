import React, { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaCircleNotch,
  FaCriticalRole,
  FaDotCircle,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";
import Styles from "./TreeView.module.scss";

function TreeView({ data, handleFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // console.log(data);

  useEffect(() => {
    let categoriesTemp = [];
    let categoriesFinal = [];

    categoriesTemp.push("All");
    data.map((product) => {
      categoriesTemp.push(product.category);
    });

    let uniqueCategories = [...new Set(categoriesTemp)];
    uniqueCategories.sort();

    uniqueCategories.map((option) => {
      categoriesFinal.push(option);
    });

    let subCategoriesTemp = [];
    let subCategoriesFinal = [];

    subCategoriesTemp.push({ category: "All", subCategory: "" });

    data.map((product) => {
      subCategoriesTemp.push({
        category: product.category,
        subCategory: product.subcategory,
      });
    });

    let uniqueSubCategories = [...new Set(subCategoriesTemp)];
    uniqueSubCategories.sort((a, b) => {
      if (a.category < b.category) {
        return -1;
      } else if (a.category > b.category) {
        return 1;
      } else {
        return 0;
      }
    });

    uniqueSubCategories.map((option) => {
      subCategoriesFinal.push(option);
    });

    setCategories([...categoriesFinal]);
    setSubCategories([...subCategoriesFinal]);

    console.log(categories, "as");
    console.log(subCategoriesFinal, "sub");
  }, []);

  return (
    <div className={Styles.treeview}>
      <div className={Styles.treeview_header}>
        <FaCircleNotch />
        <h2 className={Styles.treeview_header_title}>Categories</h2>
      </div>
      <div className={Styles.treeview_body}>
        {subCategories ? (
          subCategories.map((category, index) => {
            return (
              <div className={Styles.treeview_body_item} key={index}>
                <div className={Styles.treeview_body_item_header}>
                  <FaPlusCircle
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
                {subCategories ? (
                  <div className={Styles.treeview_body_item_body}>
                    {subCategories
                      .filter((item) => {
                        return item.category === category.category;
                      })
                      .map((subCategory, index) => {
                        return (
                          subCategory.subCategory && (
                            <div
                              className={Styles.treeview_body_item_body_item}
                            >
                              <div
                                className={
                                  Styles.treeview_body_item_body_item_icon
                                }
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
                                    subCategory.subCategory,
                                    "subCategory"
                                  )
                                }
                              >
                                {subCategory.subCategory}
                              </h3>
                            </div>
                          )
                        );
                      })}
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <div>Null</div>
        )}
      </div>
    </div>
  );
}

export default TreeView;
