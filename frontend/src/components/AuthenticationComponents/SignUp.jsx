import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,  
  Flex,
  Center,  
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';

function SignupCard() {
  const [formData , setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e)=> {
    setFormData({...formData , [e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/signup", formData);
      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;

        // Store tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        console.log("User signup successful");
      }
    } catch (error) {
      console.error("Error in signing up", error);
    }
  };

  return (
    <Center height="100vh"> 
    <Flex flexDirection="column">
      <Flex as="form" flexDirection="column" height={435} width={400} p={6} boxShadow="lg" borderRadius="md" bg="7E60BF">
        <FormLabel fontSize="2xl" mb={6}>Create an account</FormLabel>
        
        <Flex flexDirection="row" gap={3}>
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input placeholder='First name' name='firstName' value={formData.firstName} onChange={handleChange}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Last name</FormLabel>
            <Input placeholder='Last name' name='lastName' value={formData.lastName} onChange={handleChange}/>
          </FormControl>
        </Flex>

        <FormControl isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder='Email' name='emailId' value={formData.emailId} onChange={handleChange}/>
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange}/>
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange}/>
        </FormControl>
        
        
      </Flex>
      <Center>
          <Button type="submit" onClick={handleSubmit} colorScheme='purple' mt={2}>Create Account</Button>
        </Center>
      </Flex>
    </Center>
  );
}

export default SignupCard;
