import { useContext, useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Table, TableBody, TableCell, TableHead, TableRow, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import productsData from '../data/products.json';

function Checkout() {
  const { cart, getCartTotal, saveCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('paystack'); 

  
  useEffect(() => {
    const validCart = cart.filter(
      (item) =>
        item.product &&
        typeof item.product === 'object' &&
        item.product.id &&
        item.quantity > 0 &&
        productsData.find((p) => p.id === item.product.id)
    );
    if (validCart.length !== cart.length) {
      saveCart(validCart);
    }
  }, [cart, saveCart]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    // Simulate payment processing
    alert(`Processing payment via ${paymentMethod.toUpperCase()} for ₦${getCartTotal().toLocaleString()}`);
    console.log('Payment details:', { cart, total: getCartTotal(), paymentMethod });
    navigate('/'); 
  };

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
        Checkout
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ color: '#000000' }}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {/* Cart Items Table */}
          <Table sx={{ backgroundColor: '#FFFFFF', borderRadius: '8px', mb: 4 }}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item, index) => {
                if (!item.product || !item.product.id || !item.quantity) {
                  return null; 
                }
                const price = item.product.price || 0;
                const total = price * item.quantity;
                return (
                  <TableRow key={item.product.id || index}>
                    <TableCell>{item.product.name || 'Unknown Product'}</TableCell>
                    <TableCell align="right">₦{price.toLocaleString()}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">₦{total.toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Payment Method Selection */}
          <Box
            sx={{
              maxWidth: 600,
              mx: 'auto',
              backgroundColor: '#FFFFFF',
              p: 4,
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              mb: 4,
            }}
          >
            <FormControl component="fieldset" fullWidth>
              <FormLabel
                component="legend"
                sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#000000', mb: 2 }}
              >
                Select Payment Method
              </FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
              >
                <FormControlLabel
                  value="paystack"
                  control={<Radio sx={{ color: '#000000', '&.Mui-checked': { color: '#F68B1E' } }} />}
                  label="Paystack"
                  sx={{ color: '#000000' }}
                />
                <FormControlLabel
                  value="opay"
                  control={<Radio sx={{ color: '#000000', '&.Mui-checked': { color: '#F68B1E' } }} />}
                  label="OPay"
                  sx={{ color: '#000000' }}
                />
                <FormControlLabel
                  value="gtbank"
                  control={<Radio sx={{ color: '#000000', '&.Mui-checked': { color: '#F68B1E' } }} />}
                  label="GTBank"
                  sx={{ color: '#000000' }}
                />
                <FormControlLabel
                  value="firstbank"
                  control={<Radio sx={{ color: '#000000', '&.Mui-checked': { color: '#F68B1E' } }} />}
                  label="FirstBank"
                  sx={{ color: '#000000' }}
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Total and Proceed Button */}
          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Typography variant="h5" sx={{ color: '#000000', mb: 2 }}>
              Total: ₦{(getCartTotal() || 0).toLocaleString()}
            </Typography>
            <Button
              variant="contained"
              onClick={handlePaymentSubmit}
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                fontSize: '1.2rem',
                py: 1.5,
                px: 4,
                '&:hover': { backgroundColor: '#333333' },
              }}
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Proceed to Payment
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Checkout;