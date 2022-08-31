import classNames from "classnames";
import React, { useEffect } from "react";
import Styles from "./Services.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { services } from "../../../assets/data.json";

function Services() {
  const [ref, inView] = useInView({
    threshold: 0.2,
  });

  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        scale: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: 0.3,
        },
      });
    } else {
      animation.start({
        scale: 0,
      });
    }
  }, [inView]);

  return (
    <div ref={ref} id="products" className={Styles.container}>
      <motion.div
        animate={animation}
        className={classNames("container", [Styles.services])}
      >
        <div className={Styles.services_top}>
          <h3 className={Styles.services_top_title}>Our Services</h3>
          <span></span>
          <p className={Styles.services_top_text}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
            delectus, eum error iusto harum fugiat?
          </p>
        </div>

        <div className={Styles.services_bottom}>
          {services.map((service, index) => (
            <div
              className={classNames(Styles.services_bottom_service, {
                [Styles.services_bottom_service_reverse]: index % 2 != 0,
              })}
              key={index}
            >
              <div className={Styles.services_bottom_service_image}>
                <img
                  src={window.location.origin + "/assets/svg/" + service.image}
                  alt={service.title}
                  loading="lazy"
                />
              </div>
              <div
                className={classNames(Styles.services_bottom_service_content, {
                  [Styles.services_bottom_service_content_reverse]:
                    index % 2 != 0,
                })}
              >
                <h3 className={Styles.services_bottom_service_content_title}>
                  {service.name}
                </h3>
                <span></span>
                <p className={Styles.services_bottom_service_content_desc}>
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Services;
