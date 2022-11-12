import React, { useState, useEffect } from "react";

import { TextInput, Button, Group, Box,Text  } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { openModal } from '@mantine/modals';

import {
    FaUpload,
    FaCheck,
    FaExclamationTriangle,
  } from "react-icons/fa";
  
function WorkerModal() {

    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
          name: '',
          title: '',
          desc: '',
          image: '',
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });

  return (
    <Group position="center" >
    <Button
      onClick={() => {
        openModal({
          title: 'Add worker',
          centered: true,
          children: (
            <>
              <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        withAsterisk
                        label="Name"
                        placeholder="Jon Snow"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        withAsterisk
                        label="Title"
                        placeholder="CEO"
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        withAsterisk
                        label="Description"
                        placeholder="lorem ipsum"
                        {...form.getInputProps('desc')}
                    />

                    <Dropzone
                        mt="md"
                        withPreview
                        loading={loading}
                        onDrop={(files) => console.log('accepted files', files)}
                        onReject={(files) => console.log('rejected files', files)}
                        maxSize={3 * 1024 ** 2}
                        accept={['image/png', 'image/jpeg', 'image/jpg']}
                    >
                        <Group position="center" spacing="m" style={{ minHeight: 220, pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                            <FaCheck/>
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <FaExclamationTriangle/>                
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <FaUpload/>
                        </Dropzone.Idle>

                        <div>
                            <Text size="xl" inline>
                            Drag image here or click to select file
                            </Text>
                        </div>
                        </Group>
                    </Dropzone>

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
    
  )
};

export default WorkerModal;