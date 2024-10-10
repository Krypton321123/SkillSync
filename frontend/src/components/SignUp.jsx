import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,  
  Flex,
  Center,  
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

function SignupCard() {
  return (
    <Center height="100vh"> 
      <Flex flexDirection="column" height={420} width={400} p={6} boxShadow="lg" borderRadius="md" bg="7E60BF">
        <FormLabel fontSize="2xl" mb={6}>Create an account</FormLabel>
        <Flex flexDirection="row" gap={3}>
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input placeholder='First name' />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Last name</FormLabel>
            <Input placeholder='Last name' />
          </FormControl>
        </Flex>

        <FormControl isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder='Email' />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder='Password' />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" placeholder='Confirm Password' />
        </FormControl>
        
        <Center>
          <Button colorScheme='purple' mt={6}>Create Account</Button>
        </Center>
      </Flex>
    </Center>
  )
}

export default SignupCard;
