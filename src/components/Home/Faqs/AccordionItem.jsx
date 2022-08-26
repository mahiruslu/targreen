import classNames from "classnames";
import React from "react";
import Styles from "./Accordion.module.scss";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";

function AccordionItem({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  onClick,
}) {
  return (
    <div className={Styles.faq_question}>
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

        <FaArrowRight
          className={classNames({
            [Styles.faq_question_button_rotate]: ariaExpanded,
          })}
        />
      </button>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 1,
            bounce: 0.25,
          }}
          className={classNames([
            Styles.faq_question_desc,
            {
              [Styles.faq_question_desc_show]: showDescription,
            },
          ])}
        >
          {item.answer}
        </motion.div>
      )}
    </div>
  );
}

export default AccordionItem;
