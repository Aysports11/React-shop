import { useState, useContext } from 'react';
import { Container, Typography, Box, TextField, Button, Alert, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import productsData from '../data/products.json';

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getAllUserCarts } = useContext(CartContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@fragrance.com' && password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  // Get registered users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userCarts = getAllUserCarts();

  if (!isLoggedIn) {
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
          Admin Login
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
          <form onSubmit={handleLogin}>
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
              Login
            </Button>
          </form>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      sx={{ py: 4, backgroundColor: '#F68B1E' }}
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
        Admin Dashboard
      </Typography>

      {/* Products Table */}
      <Typography
        variant="h5"
        sx={{ mt: 4, mb: 2, fontFamily: 'Roboto, sans-serif', color: '#000000' }}
      >
        Products
      </Typography>
      <Table sx={{ backgroundColor: '#FFFFFF', borderRadius: '8px', mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsData.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>₦{product.price.toLocaleString()}</TableCell>
              <TableCell>{product.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Registered Users Table */}
      <Typography
        variant="h5"
        sx={{ mt: 4, mb: 2, fontFamily: 'Roboto, sans-serif', color: '#000000' }}
      >
        Registered Users
      </Typography>
      <Table sx={{ backgroundColor: '#FFFFFF', borderRadius: '8px', mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Registration Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} align="center">
                No registered users
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.registeredAt
                    ? new Date(user.registeredAt).toLocaleString()
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* User Carts Table */}
      <Typography
        variant="h5"
        sx={{ mt: 4, mb: 2, fontFamily: 'Roboto, sans-serif', color: '#000000' }}
      >
        User Carts
      </Typography>
      <Table sx={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
        <TableHead>
          <TableRow>
            <TableCell>User Email</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userCarts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No user carts
              </TableCell>
            </TableRow>
          ) : (
            userCarts.flatMap(({ email, cart }) =>
              cart.map((item) => (
                <TableRow key={`${email}-${item.product.id}`}>
                  <TableCell>{email}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">₦{item.product.price.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    ₦{(item.product.price * item.quantity).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Admin;