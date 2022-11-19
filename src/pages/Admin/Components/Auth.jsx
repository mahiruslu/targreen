import React, { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";
import Styles from "./Auth.module.scss";

import {
  toastifySuccess,
  toastifyError,
} from "../../../utils/hooks/useToastify";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { FaMailBulk, FaKey } from "react-icons/fa";

import { ToastContainer } from "../../../utils/hooks/useToastify";

import { signIn } from "../../../utils/hooks/useFirebase";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((res) => {
        toastifySuccess("Successfully logged in");
        console.log(res);
        sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);

        navigate("/admin");
      })
      .catch((err) => {
        toastifyError(err.message);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={Styles.auth}
    >
      <Form
        action="/"
        onSubmit={(e) => handleSubmit(e)}
        noValidate
        position="center"
      >
        <FormGroup>
          <Label>Email</Label>
          <Input
            label="Email"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" color="success">
            Login
          </Button>
        </FormGroup>
      </Form>
      <ToastContainer />
    </motion.div>
  );
}

export default Auth;
