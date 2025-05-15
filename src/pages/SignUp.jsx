import { useState, useContext } from 'react';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signup(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#000000' }}
      >
        Sign Up
      </Typography>
      <Box
        sx={{
          maxWidth: 400,
          mx: 'auto',
          backgroundColor: '#FFFFFF',
          p: 4,
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ backgroundColor: '#FFFFFF' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ backgroundColor: '#FFFFFF' }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              mt: 2,
              '&:hover': { backgroundColor: '#333333' },
            }}
          >
            Sign Up
          </Button>
        </form>
        <Button
          variant="text"
          sx={{ mt: 2, color: '#000000' }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
}

export default Signup;