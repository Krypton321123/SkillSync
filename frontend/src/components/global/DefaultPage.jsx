import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Button, Stack, Image } from '@chakra-ui/react';

const DefaultPage = () => {
  return (
    <Box 
      textAlign="center" 
      py={10} 
      px={6} 
      bgGradient="linear(to-r, blue.400, purple.400)"
      color="white"
      h="100vh"
      overflow="hidden"
     
    >
      <Heading fontSize="4xl" mb={6}>
        Welcome to SkillSync
      </Heading>
      <Text fontSize="xl" mb={6}>
        Your one-stop platform for skill-based connections, mentorship, and growth.
      </Text>
      
      <Box mb={10}>
        <Image 
          src="./logo.png" 
          alt="SkillSync Preview" 
          borderRadius="lg"
          mx="auto"
          shadow="lg"
          width="270px"
          height="250px"
          objectFit="cover"
        />
      </Box>
      
      <Stack direction="row" spacing={6} justify="center">
        <Link to="/signup">
          <Button 
            size="lg" 
            colorScheme="teal" 
            variant="solid" 
            _hover={{ bg: "teal.700" }}
          >
            Get Started
          </Button>
        </Link>
        <Link to="/signin">
          <Button 
            size="lg" 
            colorScheme="gray" 
            variant="outline" 
            _hover={{ bg: "gray.700", color: "white" }}
          >
            Log In
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default DefaultPage;
