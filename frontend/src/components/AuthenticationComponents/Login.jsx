import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Center,
  Button,
  useToast, // Import Chakra's toast hook
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); // Use the navigate hook to navigate to different routes
  const toast = useToast(); // Initialize the toast hook
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/login',
        formData
      );
      console.log(response);
      if (response) {
        toast({
          title: 'Logged in successfully!',
          status: 'success',
          duration: 3000, // Toast disappears after 3 seconds
          isClosable: true,
        });
        navigate('/test'); // Navigate to the dashboard after successful login

      }
    } catch (error) {
      console.log('Error in Login', error);
      toast({
        title: 'Error in Login!',
        description: error.response?.data?.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Center height="100vh">
        <Flex flexDirection="column">
          <Flex
            flexDirection="column"
            height={300}
            width={400}
            p={6}
            boxShadow="lg"
            borderRadius="md"
            as="form"
          >
            <FormLabel fontSize="2xl" mb={6}>
              Welcome back!
            </FormLabel>
            <FormControl isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
          </Flex>
          <Center>
            <Button
              type="submit"
              onClick={handleSubmit}
              colorScheme="purple"
              mt={2}
            >
              Login to SkillSync
            </Button>
          </Center>
        </Flex>
      </Center>
    </div>
  );
}

export default Login;
