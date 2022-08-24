import React, { useState } from "react";
import AccordionItem from "./AccordionItem.jsx";
import Styles from "./Accordion.module.scss";

const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderedQuestionsAnswers = data.map((item, index) => {
    const showDescription = index === activeIndex ? true : false;
    const fontWeightBold = index === activeIndex ? true : false;
    const ariaExpanded = index === activeIndex ? true : false;
    return (
      <AccordionItem
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        item={item}
        index={index}
        onClick={() => {
          setActiveIndex(index);
          console.log(activeIndex);
        }}
      />
    );
  });

  return (
    <div className={Styles.faq}>
      <dl className={Styles.faq_list}>{renderedQuestionsAnswers}</dl>
    </div>
  );
};

export default Accordion;
