import { useContext } from 'react';
import { Container, Typography, Button, Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

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
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ color: '#000000' }}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Table sx={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.product.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell align="right">₦{item.product.price.toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        sx={{ color: '#000000' }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        sx={{ color: '#000000' }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    ₦{(item.product.price * item.quantity).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => removeFromCart(item.product.id)}
                      sx={{ color: '#F44336' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Typography variant="h5" sx={{ color: '#000000', mb: 2 }}>
              Total: ₦{getCartTotal().toLocaleString()}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#000000',
                  color: '#000000',
                  '&:hover': { backgroundColor: '#000000', color: '#FFFFFF' },
                }}
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#333333' },
                }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Cart;