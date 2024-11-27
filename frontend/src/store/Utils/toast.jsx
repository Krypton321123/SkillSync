import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const toast = ({ status, title }) => {
  if (!status || !title || !description) return null; // Render nothing if no data provided

  return (
    <Alert status={status} mt={4}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      
    </Alert>
  );
};


  
  export default toast
  