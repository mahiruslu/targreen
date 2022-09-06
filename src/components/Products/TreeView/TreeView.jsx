import React, { useState, useEffect } from "react";
import { FaArrowRight, FaCircleNotch, FaDotCircle } from "react-icons/fa";
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

    uniqueCategories.map((option) => {
      categoriesFinal.push(option);
    });

    let subCategoriesTemp = [];
    let subCategoriesFinal = [];

    data.map((product) => {
      subCategoriesTemp.push(product.subcategory);
    });

    let uniqueSubCategories = [...new Set(subCategoriesTemp)];

    uniqueSubCategories.map((option) => {
      subCategoriesFinal.push(option);
    });

    console.log(categoriesFinal, "sa");
    console.log(subCategoriesFinal, "sa");

    setCategories([...categoriesFinal]);
    console.log(categories, "as");
  }, [data]);

  return (
    <div className={Styles.treeview}>
      <div className={Styles.treeview_header}>
        <FaCircleNotch />
        <h2 className={Styles.treeview_header_title}>Categories</h2>
      </div>
      <div className={Styles.treeview_body}>
        {categories ? (
          categories.map((category, index) => {
            return (
              <div className={Styles.treeview_body_item} key={index}>
                <div
                  className={Styles.treeview_body_item_header}
                  onClick={() => handleFilterChange(category)}
                >
                  <FaArrowRight />
                  <h2>{category}</h2>
                </div>
                <div className={Styles.treeview_body_item_body}>
                  <div className={Styles.treeview_body_item_body_item}>
                    <div className={Styles.treeview_body_item_body_item_icon}>
                      <FaDotCircle />
                    </div>
                    <h3 className={Styles.treeview_body_item_body_item_title}>
                      Subcategory Lorem ipsum dolor sit amet.
                    </h3>
                  </div>
                  <div className={Styles.treeview_body_item_body_item}>
                    <div className={Styles.treeview_body_item_body_item_icon}>
                      <FaDotCircle />
                    </div>
                    <h3 className={Styles.treeview_body_item_body_item_title}>
                      Subcategory 2
                    </h3>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>Null</div>
        )}
        {/* <div className={Styles.treeview_body_tree_item}>
            <div className={Styles.treeview_body_tree_item_header}>
              <FaArrowRight />
              <h2>Category 2</h2>
            </div>
            <div className={Styles.treeview_body_tree_item_body}>
              <div className={Styles.treeview_body_tree_item_body_item}>
                <div className={Styles.treeview_body_tree_item_body_item_icon}>
                  <FaDotCircle />
                </div>
                <h3 className={Styles.treeview_body_tree_item_body_item_title}>
                  Subcategory 1
                </h3>
              </div>
              <div className={Styles.treeview_body_tree_item_body_item}>
                <div className={Styles.treeview_body_tree_item_body_item_icon}>
                  <FaDotCircle />
                </div>
                <h3 className={Styles.treeview_body_tree_item_body_item_title}>
                  Subcategory 2
                </h3>
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
}

export default TreeView;
