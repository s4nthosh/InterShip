import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { CssBaseline, GlobalStyles } from '@mui/material';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { base_url } from '../Constant/ApiUrl';

const Loginpage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error('Please enter both username/userID and password');
      return;
    }

    const data = {
      userName,
      password,
    };

    try {
      const response = await axios.post(`${base_url}/AdminLogin.php`, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Login successful!');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000); // 1 second delay for toast
      } else {
        toast.error(response.data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
      <GlobalStyles
        styles={{
          html: { overflow: 'hidden', height: '100%' },
          body: { overflow: 'hidden', height: '100%', margin: 0 },
          '#root': { height: '100%' },
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1 style={{ marginBottom: '20px' }}>Logo</h1>
          <TextField
            required
            id="outlined-required"
            label="User Name"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            sx={{ marginBottom: '20px' }}
          />
          <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{
              marginTop: '20px',
              width: '100%',
              backgroundColor: 'blue',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Loginpage;