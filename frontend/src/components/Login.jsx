import React , {useState} from 'react';
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

function Login() {
  const [formData , setFormData] = useState({
    emailId: '',
    password: ''
  })

  const handleChange = (e)=> {
    setFormData({...formData , [e.target.name]:e.target.value});
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();  // Prevent the default form submission behavior

    try {
      const response = await axios.post("http://localhost:5173/api/v1/use/login", formData);
      console.log(response);
    } catch(error) {
      console.log("Error in Login", error);
    }
  }
  return (
    <div>
      <Center height="100vh"> 
        <Flex 
          flexDirection="column" 
          height={300} 
          width={400} 
          p={6} 
          boxShadow="lg" 
          borderRadius="md"
          as="form"
          onSubmit={handleSubmit}
        >
          <FormLabel fontSize="2xl" mb={6}>
            Login to SkillSync
          </FormLabel>
          <FormControl isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Email" name='emailId' value={formData.emailId} onChange={handleChange}/>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange}/>
          </FormControl>
          <Center>
            <Button type="submit" colorScheme="purple" mt={20}>Login</Button>
          </Center>
          {/* <Link to="/login">Already have an account? Login</Link> */}
        </Flex>
      </Center>
    </div>
  );
}

export default Login;
