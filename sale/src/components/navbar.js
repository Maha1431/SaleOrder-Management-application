import React from 'react';
import { Flex, Button, Switch, useColorMode } from '@chakra-ui/react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDarkMode, setIsDarkMode] = useLocalStorage('isDarkMode', colorMode === 'dark');

  const handleToggle = () => {
    toggleColorMode();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Flex justifyContent="space-between" p="4" bg="gray.800" color="white">
      <Button onClick={logout}>Logout</Button>
      <Switch isChecked={isDarkMode} onChange={handleToggle}>Dark Mode</Switch>
    </Flex>
  );
};

export default Navbar;
