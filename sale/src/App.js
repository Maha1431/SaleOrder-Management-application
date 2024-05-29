import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, useAuth } from './Auth/Authcontext';
import theme from './theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './hooks/ThemeContext';
import ToggleSwitch from './hooks/toggleSwitch';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ThemeProvider> {/* Add ThemeProvider here */}
          <Router>
            <AuthProvider>
              <ToggleSwitch /> {/* Add ToggleSwitch here */}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
