import React from "react";
import Styles from "./Button.module.scss";

import { FaArrowRight } from "react-icons/fa";

function Button({ children, ...props }) {
  return (
    <button type="button" className={Styles.button} {...props}>
      {children} <FaArrowRight />
    </button>
  );
}

export default Button;
