import classNames from "classnames";
import React from "react";
import Styles from "./Accordion.module.scss";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";

const AccordionItem = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  onClick,
}) => (
  <div className={Styles.faq_question} key={item.question}>
    <button
      aria-expanded={ariaExpanded}
      className={classNames([
        Styles.faq_question_button,
        {
          [Styles.faq_question_button_bold]: fontWeightBold,
        },
      ])}
      onClick={onClick}
    >
      {item.question}

      {ariaExpanded ? <FaArrowDown /> : <FaArrowRight />}
    </button>
    {showDescription && (
      <p
        className={classNames([
          Styles.faq_question_desc,
          {
            [Styles.faq_question_desc_show]: showDescription,
          },
        ])}
      >
        {item.answer}
      </p>
    )}
  </div>
);

export default AccordionItem;
