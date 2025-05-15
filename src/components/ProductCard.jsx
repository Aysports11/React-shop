import { useState, useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
      }}
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.images[0] || 'https://via.placeholder.com/200'}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200';
        }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            color: '#000000',
            mb: 1,
            minHeight: '48px',
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            color: '#000000',
            mb: 2,
          }}
        >
          ₦{product.price.toLocaleString()}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <IconButton
            onClick={() => handleQuantityChange(quantity - 1)}
            sx={{ color: '#000000' }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ mx: 2, fontFamily: 'Roboto, sans-serif' }}>
            {quantity}
          </Typography>
          <IconButton
            onClick={() => handleQuantityChange(quantity + 1)}
            sx={{ color: '#000000' }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            width: '100%',
            '&:hover': { backgroundColor: '#333333' },
          }}
          onClick={() => addToCart(product, quantity)}
        >
          Add to Cart
        </Button>
        <Button
          variant="text"
          sx={{ color: '#000000', mt: 1 }}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;