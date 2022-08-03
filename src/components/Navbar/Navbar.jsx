import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Styles from "./Navbar.module.scss";
import classNames from "classnames/bind";

const MOBILE_MENU_WINDOW_WIDTH = 768;

function Navbar(props) {
  const { isFixed, color } = props;
  // const navigation = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(
    windowWidth < MOBILE_MENU_WINDOW_WIDTH ? true : false
  );

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
    setIsMobile(!isMobile);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    windowWidth < MOBILE_MENU_WINDOW_WIDTH
      ? !isMobile & setIsMobile(true)
      : isMobile & setIsMobile(false);

    return () => {
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
    };
  }, [windowWidth]);

  return (
    <div
      className={classNames(Styles.nav, {
        [Styles.nav_open]: isOpen,
      })}
    >
      <Link to="/" className={Styles.nav_logo}>
        <span>targreen.</span>
      </Link>
      <div className={Styles.nav_links}>
        {!isMobile && (
          <>
            <Link className={Styles.nav_item} to="/">
              <span className={Styles.nav_item_title}>Home</span>
            </Link>

            <Link className={Styles.nav_item} to="/timeline">
              <span className={Styles.nav_item_title}>About Us</span>
            </Link>

            <Link className={Styles.nav_item} to="/blog">
              <span className={Styles.nav_item_title}>Services</span>
            </Link>

            <Link className={Styles.nav_item} to="/contact">
              <span className={Styles.nav_item_title}>Contact</span>
            </Link>
          </>
        )}
        {windowWidth < MOBILE_MENU_WINDOW_WIDTH && (
          <>
            <motion.div
              className={Styles.nav_item}
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label for="check">
                <input type="checkbox" id="check" onClick={handleMenuClick} />
                <span></span>
                <span></span>
                <span></span>
              </label>
              {/* <FontAwesomeIcon icon={!isOpen ? faBars : faXmark} size="2x" /> */}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
