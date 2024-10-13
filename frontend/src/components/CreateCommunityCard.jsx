import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,  
  Flex,
  Center,  
  Textarea,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

function CreateCommunityCard() {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post("http://localhost:5173/api/v1/use/login", formData);
      console.log(response);
    } catch (error) {
      console.log("Error in Login", error);
    }
  };

  return (
    <div>
      <Center height="100vh">
        <Flex flexDirection="column">
        <Flex
          flexDirection="column"
          height={380}
          width={400}
          p={6}
          boxShadow="lg"
          borderRadius="md"
          as="form"
          onSubmit={handleSubmit}
        >
          <FormLabel fontSize="2xl" mb={6}>
            Create Community
          </FormLabel>
          <FormControl isRequired mt={4}>
            <FormLabel>Community Name</FormLabel>
            <Input 
              type="text" 
              placeholder="Community Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
            />
          </FormControl>
          <FormControl isRequired mt={4} h={'auto'}>
            <FormLabel>Description (Max 50 words)</FormLabel>
            <Textarea
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5} // Adjust this value as needed to control the size of the Textarea
              maxLength={300} // Limit the input to 50 words approximately
            />
          </FormControl>
        </Flex>
        <Center>
            <Button type="submit" colorScheme="purple" mt={2}>
              Create
            </Button>
        </Center>
        </Flex>
      </Center>
    </div>
  );
}

export default CreateCommunityCard;
