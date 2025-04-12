import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/auth-slice';
import { login } from '../api/authService';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log({ email, password });
      const data = await login(email, password);
      dispatch(loginSuccess(data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          width: 500,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2, width: '100%' }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;