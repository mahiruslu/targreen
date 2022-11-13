import React, { useState, useEffect } from "react";

import {
  TextInput,
  Button,
  Group,
  Box,
  Text,
  Progress,
  FileInput,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { openModal } from "@mantine/modals";

// import { useForm } from "react-hook-form";
import {
  toastifySuccess,
  toastifyError,
} from "../../../utils/hooks/useToastify";

import { FaUpload, FaCheck, FaExclamationTriangle } from "react-icons/fa";

import { db, storage } from "../../../utils/hooks/useFirebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function WorkerModal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const [imageUpload, setImageUpload] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    console.log(imageUpload);
    // uploadFile();
  }, [imageUpload]);

  const uploadFile = () => {
    console.log("girdi");
    console.log(imageUpload, "in uploadFile");
    if (imageUpload === null) return;
    console.log("çıktı");
    const imageRef = ref(
      storage,
      `workers/${imageUpload.name + imageUpload.lastModified}`
    );
    console.log(imageRef);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImagePath(url);
        console.log(imagePath);
      });
    });
  };

  //   const {
  //     register,
  //     formState: { errors },
  //     handleSubmit,
  //     reset,
  //     clearErrors,
  //   } = useForm({ mode: "all" });

  const form = useForm({
    initialValues: {
      name: "",
      title: "",
      desc: "",
      image: imageUpload,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    console.log(data, "data");
    console.log(imageUpload, "imageUpload");

    try {
      uploadFile();
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
    <Group position="center">
      <Button
        onClick={() => {
          openModal({
            title: "Add worker",
            centered: true,
            children: (
              <>
                <Box sx={{ maxWidth: 300 }} mx="auto">
                  <form
                    onSubmit={form.onSubmit((values) => console.log(values))}
                    noValidate
                  >
                    <TextInput
                      withAsterisk
                      label="Name"
                      placeholder="Jon Snow"
                      {...form.getInputProps("name")}
                      //   {...register("name", {
                      //     required: {
                      //       value: true,
                      //       message: "You need to fill name.",
                      //     },
                      //   })}
                    />
                    <TextInput
                      withAsterisk
                      label="Title"
                      placeholder="CEO"
                      {...form.getInputProps("title")}
                      //   {...register("title", {
                      //     required: {
                      //       value: true,
                      //       message: "You need to fill title.",
                      //     },
                      //   })}
                    />
                    <TextInput
                      withAsterisk
                      label="Description"
                      placeholder="lorem ipsum"
                      {...form.getInputProps("desc")}
                      //   {...register("desc", {
                      //     required: {
                      //       value: true,
                      //       message: "You need to fill description.",
                      //     },
                      //   })}
                    />

                    <FileInput
                      label="Image"
                      withAsterisk
                      placeholder="Choose image"
                      //   {...register("image")}
                      {...form.getInputProps("image", {
                        type: "file",
                      })}
                      onChange={(e) => {
                        console.log(e);
                        setImageUpload(e);
                      }}
                      accept="image/png,image/jpeg"
                      type="file"
                    />

                    {/* <Dropzone
                      mt="md"
                      loading={isSubmitting}
                      multiple={false}
                      onDrop={(files) => {
                        setImageUpload(files[0]);
                        console.log("accepted files", files[0]);
                      }}
                      onReject={(files) => console.log("rejected files", files)}
                      maxSize={2 * 1024 ** 2}
                      accept={["image/png", "image/jpeg", "image/jpg"]}
                    >
                      <Group
                        position="center"
                        spacing="m"
                        style={{ minHeight: 220, pointerEvents: "none" }}
                      >
                        <Dropzone.Accept>
                          <FaCheck />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                          <FaExclamationTriangle />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                          <FaUpload />
                        </Dropzone.Idle>

                        <div>
                          <Text size="xl" inline>
                            Drag image here or click to select file
                          </Text>
                        </div>
                      </Group>
                    </Dropzone> */}

                    <Progress mt="md" value={50}></Progress>

                    <Group position="right" mt="md">
                      <Button type="submit">Add</Button>
                    </Group>
                  </form>
                </Box>
              </>
            ),
          });
        }}
      >
        Add new worker
      </Button>
    </Group>
  );
}

export default WorkerModal;
