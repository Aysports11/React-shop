import { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }, []);

  return (
    <Container
      sx={{ py: 4 }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: "'Playfair Display', serif", color: '#4A2C6B' }}
      >
        Our Perfume Collection
      </Typography>
      {products.length === 0 ? (
        <Typography variant="body1" align="center">
          No products available
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Products;