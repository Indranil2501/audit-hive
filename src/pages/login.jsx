import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../features/auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Card, CardContent, Link, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axiosInstance from '../api/axiosInstance';
import apiConfig from '../api/apiConfig';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetCard, setShowResetCard] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(apiConfig.login, {
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleForgotPassword = () => {
    setShowResetCard(true);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(apiConfig.forgotPassword, {
        email: resetEmail,
      });
      toast.success(response.data.message); // Display success message from API response
      setShowResetCard(false);
      navigate('/login');
    } catch (error) {
      console.error('Password reset failed:', error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.'); // Display error message
    }
  };

  const handleBackToLogin = () => {
    setShowResetCard(false);
  };

  if (isAuthenticated) {
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
            <Typography variant="h5" gutterBottom>
              Welcome, {email}!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{ width: '100%' }}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      {!showResetCard ? (
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
              <Link
                component="button"
                variant="body2"
                onClick={handleForgotPassword}
                sx={{ mt: 2, cursor: 'pointer' }}
              >
                Forgot Password?
              </Link>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            width: 500,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <IconButton onClick={handleBackToLogin} sx={{ mr: 1 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5">Reset Password</Typography>
            </Box>
            <Box
              component="form"
              onSubmit={handleResetPassword}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                label="Email"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                sx={{ mb: 2, width: '100%' }}
              />
              <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
                Reset
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Login;