import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, CardMedia, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import productsData from '../data/products.json';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [validImages, setValidImages] = useState([]);

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      // Filter valid and unique images
      const uniqueImages = [...new Set(
        (foundProduct.images || []).filter(
          (img) => img && typeof img === 'string' && img.trim() !== ''
        )
      )];
      setValidImages(uniqueImages);
      setProduct(foundProduct);
      setCurrentImageIndex(0);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? validImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === validImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

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
        {product.name}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '600px',
              mx: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              p: 2,
            }}
          >
            {validImages.length === 0 ? (
              <Box
                sx={{
                  width: { xs: '100%', sm: '500px' },
                  height: { xs: '300px', sm: '400px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F5F5F5',
                  borderRadius: '8px',
                }}
              >
                <Typography variant="body1" color="#000000">
                  No images available
                </Typography>
              </Box>
            ) : (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: { xs: 0, sm: '-40px' },
                    color: '#FFFFFF',
                    bgcolor: '#000000',
                    '&:hover': { bgcolor: '#333333' },
                    zIndex: 1,
                    visibility: validImages.length > 1 ? 'visible' : 'hidden',
                  }}
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowBackIos />
                </IconButton>
                <AnimatePresence mode="wait">
                  <CardMedia
                    key={currentImageIndex}
                    component="img"
                    sx={{
                      width: { xs: '100%', sm: '500px' },
                      height: { xs: '300px', sm: '400px' },
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                    image={validImages[currentImageIndex] || 'https://via.placeholder.com/500'}
                    alt={`${product.name || 'Product'} - Image ${currentImageIndex + 1}`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500';
                    }}
                   
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: { xs: 0, sm: '-40px' },
                    color: '#FFFFFF',
                    bgcolor: '#000000',
                    '&:hover': { bgcolor: '#333333' },
                    zIndex: 1,
                    visibility: validImages.length > 1 ? 'visible' : 'hidden',
                  }}
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowForwardIos />
                </IconButton>
              </>
            )}
          </Box>
          {validImages.length > 1 && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="#000000">
                Image {currentImageIndex + 1} of {validImages.length}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: '#000000', fontFamily: 'Roboto, sans-serif' }}
          >
            {product.description}
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 2, color: '#000000', fontFamily: 'Roboto, sans-serif' }}
          >
            ₦{product.price.toLocaleString()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                fontSize: '1.2rem',
                py: 1.5,
                px: 4,
                '&:hover': { backgroundColor: '#4A2C6B' },
              }}
              onClick={() => addToCart(product, quantity)}
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#000000',
                color: '#000000',
                fontSize: '1.2rem',
                py: 1.5,
                px: 4,
                '&:hover': { backgroundColor: '#000000', color: '#FFFFFF' },
              }}
              onClick={() => navigate('/products')}
            >
              Back to Products
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetails;