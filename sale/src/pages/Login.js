import React, { useState } from 'react';
import { useAuth } from '../Auth/Authcontext';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      // Dummy authentication, replace this with your actual authentication logic
      if (username === 'admin' && password ===  '1234') {
        await login(username, password);
      } else {
        throw new Error('Invalid username or password.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <Heading mb="6">Login</Heading>
      {error && (
        <Alert status="error" mb="4" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
