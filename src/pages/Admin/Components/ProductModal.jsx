import React, { useState, useEffect, useRef } from "react";

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

import { FaShoppingBag } from "react-icons/fa";

import { db, storage } from "../../../utils/hooks/useFirebase";
import { ref as databaseRef, set } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import { v4 as uuid } from "uuid";
import Loader from "../../../components/Loader/Loader";

function ProductModal() {
  const [modal, setModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imageUpload, setImageUpload] = useState(null);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const clearValues = () => {
    setName("");
    setSku("");
    setBrand("");
    setCategory("");
    setSubCategory("");
    setTitle("");
    setDescription("");
    setImageUpload(null);
  };

  const uploadFile = () => {
    if (imageUpload === null) {
      toastifyError("Please select an image");
      return;
    }
    const imageRef = storageRef(storage, `products/${uuid()}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            saveData(url);
          })
          .catch((error) => {
            toastifyError(error.message);
          });
      })
      .catch((error) => {
        toastifyError(error.message);
      });
  };

  const saveData = (url) => {
    set(databaseRef(db, `products/${uuid()}`), {
      name: name,
      sku: sku,
      brand: brand,
      category: category,
      subcategory: subCategory,
      title: title,
      description: description,
      image: url,
    })
      .then(() => {
        toastifySuccess("Product added successfully");
        setModal(false);
        clearValues();
      })
      .catch((error) => {
        toastifyError(error.message);
      });
    databaseRef(db, "products");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      name === "" ||
      title === "" ||
      description === "" ||
      imageUpload === ""
    ) {
      toastifyError("Please fill all the fields");
      return;
    }

    try {
      uploadFile();
    } catch (e) {
      toastifyError(e.message);
    }

    setIsSubmitting(false);
  };

  return (
    <Form position="center">
      <Button onClick={() => setModal((prev) => !prev)} className="">
        <FaShoppingBag className="m-1" />
        Add new product
      </Button>
      <Modal isOpen={modal} centered>
        <Form action="/" onSubmit={(e) => handleSubmit(e)} noValidate>
          <ModalHeader toggle={() => setModal((prev) => !prev)}>
            <FaShoppingBag /> Add new product
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Stock Number</Label>
              <Input
                label="Stock Number"
                placeholder="Stock Number"
                onChange={(e) => setSku(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input
                label="Name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Title</Label>
              <Input
                label="Title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Brand</Label>
              <Input
                label="Brand"
                placeholder="Brand"
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <Input
                label="Category"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Sub Category</Label>
              <Input
                label="Sub Category"
                placeholder="Sub Category"
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                label="Description"
                placeholder="Description"
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
            <Button type="submit" color="primary">
              Add
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Form>
  );
}

export default ProductModal;
