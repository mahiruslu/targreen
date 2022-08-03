import React from "react";
import Styles from "./Contact.module.scss";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames/bind";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, bounce: true }}
      className={Styles.contact}
    >
      <div className={Styles.contact_left}>
        <div className={Styles.contact_left_top}>
          <h2>Contact Information</h2>
          <p>Fill out the form below to contact us.</p>
        </div>
        <div className={Styles.contact_left_middle}>
          <a href="mailto:" className={Styles.email}>
            Email
          </a>
          <a href="tel:" className={Styles.phone}>
            Phone
          </a>
          <a href="address:" className={Styles.address}>
            Address
          </a>
        </div>

        <div className={Styles.contact_left_bottom}>
          <a href="" className="social_icon">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="" className="social_icon">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="" className="social_icon">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="" className="social_icon">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
      </div>
      <div className={Styles.contact_right}>
        <form className={Styles.contact_right_form}>
          <div className={classNames(Styles.contact_right_form_item)}>
            <label htmlFor="name">First Name*</label>
            <input type="text" id="name" placeholder="John" required />
          </div>

          <div className={classNames(Styles.contact_right_form_item)}>
            <label htmlFor="name">Last Name</label>
            <input type="text" id="name" placeholder="Doe" />
          </div>

          <div className={classNames(Styles.contact_right_form_item)}>
            <label htmlFor="email">Email*</label>
            <input
              type="text"
              id="email"
              placeholder="johndoe@mail.com"
              required
            />
          </div>

          <div className={classNames(Styles.contact_right_form_item)}>
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" placeholder="+905551234567" />
          </div>

          <div
            className={classNames(
              Styles.contact_right_form_item,
              Styles.contact_right_form_item_full
            )}
          >
            <label htmlFor="subject">Subject*</label>
            <input type="text" id="subject" placeholder="Hello" required />
          </div>

          <div
            className={classNames(
              Styles.contact_right_form_item,
              Styles.contact_right_form_item_full
            )}
          >
            <label htmlFor="message">Message*</label>
            <textarea id="message" placeholder="Write your message" required />
          </div>

          <div
            className={classNames(
              Styles.contact_right_form_item,
              Styles.contact_right_form_item_right
            )}
          >
            <div
              className={Styles.contact_right_form_button}
              onClick={handleSubmit}
            >
              Send Message
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default Contact;
