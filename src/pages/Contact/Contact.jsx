import React, { useState } from "react";
import Styles from "./Contact.module.scss";
import Loader from "../../components/Loader/Loader";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import {
  toastifySuccess,
  ToastContainer,
  toastifyError,
} from "../../utils/hooks/useToastify";

function Contact() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const templateParams = {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        tel: data.tel,
        subject: data.subject,
        message: data.message,
      };

      await emailjs.send(
        "service_w5rcrcr",
        "template_6stuo7m",
        templateParams,
        "user_xB9Qf7kX1ChmxddSmBRip"
      );
      reset();
      toastifySuccess("We got your message! Shortly you'll be hear from us.");
    } catch (e) {
      console.log(`e`, e.message);
      toastifyError(
        "The message can't send. You can try again later or use another option."
      );
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, bounce: true }}
      className={Styles.page}
    >
      <div className={Styles.welcome}>
        <h2>Contact Us</h2>
        <p>Any question or remarks? Just write us a message.</p>
      </div>
      <div className={Styles.contact}>
        <div className={Styles.contact_left}>
          <div className={Styles.contact_left_top}>
            <h2 className={Styles.contact_left_top_title}>
              Contact Information
            </h2>
            <p className={Styles.contact_left_top_title_sub}>
              Fill out the form or use one of the following options.
            </p>
          </div>
          <div className={Styles.contact_left_middle}>
            <div className={Styles.contact_left_middle_item}>
              <a href="tel:+90 532 656 42 11" target="_blank">
                <FontAwesomeIcon icon={faPhone} id="faIcon" />
                +90 532 656 42 11
              </a>
            </div>
            <div className={Styles.contact_left_middle_item}>
              <a href="https://wa.me/+905326564211?chat" target="_blank">
                <FontAwesomeIcon icon={faWhatsapp} id="faIcon" />
                Text us on Whatsapp
              </a>
            </div>
            <div className={Styles.contact_left_middle_item}>
              <a href="https://www.facebook.com/targreenco/" target="_blank">
                <FontAwesomeIcon icon={faFacebook} id="faIcon" />
                Follow us on Facebook
              </a>
            </div>
            <div className={Styles.contact_left_middle_item}>
              <a href="https://www.linkedin.com/in/targreenco/" target="_blank">
                <FontAwesomeIcon icon={faLinkedin} id="faIcon" />
                Follow us on Linkedin
              </a>
            </div>
            <div className={Styles.contact_left_middle_item}>
              <a href="https://www.instagram.com/targreenco/" target="_blank">
                <FontAwesomeIcon icon={faInstagram} id="faIcon" />
                Follow us on Instagram
              </a>
            </div>
            <div className={Styles.contact_left_middle_item}>
              <a href="mailto:info@targreen.com" target="_blank">
                <FontAwesomeIcon icon={faMailBulk} id="faIcon" />
                info@targreen.com
              </a>
            </div>
          </div>

          <div className={Styles.contact_left_bottom}>
            {/* <div className={Styles.contact_left_bottom_circle}></div>
            <div className={Styles.contact_left_bottom_circle_half}></div> */}
          </div>
        </div>
        <div className={Styles.contact_right}>
          <form
            className={Styles.contact_right_form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={classNames(Styles.contact_right_form_item)}>
              <label htmlFor="name">First Name*</label>
              <input
                type="text"
                id="name"
                placeholder="John"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "You need to fill first name.",
                  },
                })}
              />
              {errors.firstName && (
                <span className={Styles.error_message}>
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className={classNames(Styles.contact_right_form_item)}>
              <label htmlFor="name">Last Name</label>
              <input
                type="text"
                id="name"
                placeholder="Doe"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "You need to fill last name.",
                  },
                })}
              />
              {errors.lastName && (
                <span className={Styles.error_message}>
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div className={classNames(Styles.contact_right_form_item)}>
              <label htmlFor="email">Email*</label>
              <input
                type="text"
                id="email"
                placeholder="johndoe@mail.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "You need to fill email.",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Make sure you enter a correct e-mail address.",
                  },
                })}
              />
              {errors.email && (
                <span className={Styles.error_message}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={classNames(Styles.contact_right_form_item)}>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="+905551234567"
                {...register("tel", {
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Make sure you enter a correct phone number.",
                  },
                })}
              />
              {errors.tel && (
                <span className={Styles.error_message}>
                  {errors.tel.message}
                </span>
              )}
            </div>

            <div
              className={classNames(
                Styles.contact_right_form_item,
                Styles.contact_right_form_item_full
              )}
            >
              <label htmlFor="subject">Subject*</label>
              <input
                type="text"
                id="subject"
                placeholder="Hello"
                {...register("subject", {
                  required: {
                    value: true,
                    message: "You need to provide subject.",
                  },
                  maxLength: {
                    value: 75,
                    message: "Max lenght must bu under 75 character.",
                  },
                })}
              />
              {errors.subject && (
                <span className={Styles.error_message}>
                  {errors.subject.message}
                </span>
              )}
            </div>

            <div
              className={classNames(
                Styles.contact_right_form_item,
                Styles.contact_right_form_item_full
              )}
            >
              <label htmlFor="message">Message*</label>
              <textarea
                id="message"
                placeholder="Write your message"
                {...register("message", {
                  required: {
                    value: true,
                    message: "You need to provide message.",
                  },
                  maxLength: {
                    value: 500,
                    message: "Max lenght must bu under 500 character.",
                  },
                })}
              />
              {errors.message && (
                <span className={Styles.error_message}>
                  {errors.message.message}
                </span>
              )}
            </div>

            <div
              className={classNames(
                Styles.contact_right_form_item,
                Styles.contact_right_form_item_right
              )}
            >
              <button
                className={Styles.contact_right_form_button}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader /> : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        <ToastContainer draggablePercent={60} />
      </div>
      <div className={Styles.address}>
        <div className={Styles.address_map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12602.169107120952!2d32.6510071!3d37.8476002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d099df3a196c49%3A0xa621e075c15278a2!2zMzfCsDUxJzAwLjAiTiAzMsKwMzknMTguOCJF!5e0!3m2!1str!2str!4v1659906053259!5m2!1str!2str"
            width="750"
            height="350"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="harita"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
