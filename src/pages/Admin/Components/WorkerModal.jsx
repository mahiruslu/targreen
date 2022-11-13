import React, { useState, useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import {
  toastifySuccess,
  toastifyError,
} from "../../../utils/hooks/useToastify";

import { FaUpload, FaCheck, FaExclamationTriangle } from "react-icons/fa";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { db, storage } from "../../../utils/hooks/useFirebase";
import { onValue, ref as databaseRef, push } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

const defaultValues = {
  name: "",
  title: "",
  description: "",
  image: "",
};

function WorkerModal() {
  const [modal, setModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const [imageUpload, setImageUpload] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(imageUpload, "effect");
    // uploadFile();
  }, [imageUpload]);

  const uploadFile = () => {
    console.log(imageUpload, "in uploadFile");
    if (imageUpload === null) return;
    const imageRef = storageRef(
      storage,
      `workers/${imageUpload.name + imageUpload.lastModified}`
    );
    console.log(imageRef);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImagePath(url);
        console.log(url);
      });
    });
  };

  const saveData = () => {
    const data = {
      name,
      title,
      description,
      imagePath,
    };
    console.log(databaseRef(db, "workers").child("workers"), "db");
    databaseRef(db, "workers");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleFormSubmit");
    console.log(name, title, description, imageUpload);
    if (
      name === "" ||
      title === "" ||
      description === "" ||
      imageUpload === ""
    ) {
      toastifyError("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);

    try {
      uploadFile();
      saveData();
      console.log("success");
      toastifySuccess("Worker added successfully");
    } catch (e) {
      console.log(`e`, e.message);
      toastifyError(
        "Something went wrong, please try again later or contact support"
      );
    }

    setIsSubmitting(false);
  };

  return (
    <Form position="center">
      <Button onClick={() => setModal((prev) => !prev)}>Add new worker</Button>
      <Modal isOpen={modal} centered>
        <Form action="/" onSubmit={(e) => handleSubmit(e)} noValidate>
          <ModalHeader toggle={() => setModal((prev) => !prev)}>
            Add new worker
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Name</Label>
              <Input
                label="Name"
                placeholder="Jon Snow"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Title</Label>
              <Input
                label="Title"
                placeholder="CEO"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                label="Description"
                placeholder="lorem ipsum"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Image</Label>
              <Input
                label="Image"
                placeholder="Choose image"
                accept="image/png,image/jpeg"
                type="file"
                onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Add</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Form>
  );
}

export default WorkerModal;
