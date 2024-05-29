// ToggleSwitch.js
import React from 'react';
import { useTheme } from './ThemeContext';
import { useColorMode } from '@chakra-ui/react';

const ToggleSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { toggleColorMode } = useColorMode();

  const handleChange = () => {
    toggleTheme();
    toggleColorMode();
  };

  return (
    <div>
      <input
        type="checkbox"
        id="toggle"
        checked={isDarkMode}
        onChange={handleChange}
      />
      <label htmlFor="toggle">Toggle Dark Mode</label>
    </div>
  );
};

export default ToggleSwitch;
