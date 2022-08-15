import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import logo from "../../assets/images/logo.png";

const MOBILE_MENU_WINDOW_WIDTH = 768;

function Navbar(props) {
  const { isFixed, color } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(
    windowWidth < MOBILE_MENU_WINDOW_WIDTH ? true : false
  );
  const [isAtTop, setIsAtTop] = useState(true);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
    // setIsMobile(!isMobile);
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

  const handleScroll = () => {
    setIsAtTop(window.scrollY <= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsAtTop(document.body.scrollHeight > window.innerHeight);
  }, [useLocation()?.pathname]);

  return (
    <nav
      className={classNames(Styles.nav, {
        [Styles.nav_open]: isOpen,
        [Styles.nav_top]: !isAtTop,
      })}
    >
      <div
        className={classNames({
          [Styles.nav_container]: isMobile,
        })}
      >
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          className={Styles.nav_logo}
        >
          <Link to="/">
            <img src={logo} alt="" clasname={Styles.nav_logo_img} width={150} />
          </Link>
        </motion.div>
        {windowWidth < MOBILE_MENU_WINDOW_WIDTH && (
          <>
            <motion.div
              className={Styles.nav_item}
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label for="check" className={Styles.nav_item_check}>
                <input
                  type="checkbox"
                  id="check"
                  checked={isOpen}
                  onClick={handleMenuClick}
                />
                <span></span>
                <span></span>
                <span></span>
              </label>
              {/* <FontAwesomeIcon icon={!isOpen ? faBars : faXmark} size="2x" /> */}
            </motion.div>
          </>
        )}
      </div>
      {isOpen || !isMobile ? (
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.2,
          }}
          className={classNames(Styles.nav_links, {
            [Styles.nav_links_open]: isOpen,
          })}
        >
          <Link className={Styles.nav_item} to="/" onClick={handleMenuClick}>
            <span className={Styles.nav_item_title}>Home</span>
          </Link>

          <Link
            className={Styles.nav_item}
            to="/blog"
            onClick={handleMenuClick}
          >
            <span className={Styles.nav_item_title}>Products</span>
          </Link>

          <Link
            className={Styles.nav_item}
            to="/timeline"
            onClick={handleMenuClick}
          >
            <span className={Styles.nav_item_title}>About</span>
          </Link>

          <Link
            className={Styles.nav_item}
            to="/contact"
            onClick={handleMenuClick}
          >
            <span className={Styles.nav_item_title}>Contact</span>
          </Link>
        </motion.div>
      ) : null}
    </nav>
  );
}

export default Navbar;
