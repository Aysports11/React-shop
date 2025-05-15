import React, { useEffect, useRef } from 'react';
import { Typography, Button, Box } from '@mui/material'; 
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const perfumeImages = [
  {
    src: 'https://images.pexels.com/photos/7247803/pexels-photo-7247803.jpeg',
    alt: 'Luxury perfume bottle with floral notes',
    title: 'Elegance in Every Spray',
  },
  {
    src: 'https://images.pexels.com/photos/8166566/pexels-photo-8166566.jpeg',
    alt: 'Modern perfume bottle on sleek surface',
    title: 'Bold. Timeless. You.',
  },
  {
    src: 'https://images.pexels.com/photos/2814832/pexels-photo-2814832.jpeg',
    alt: 'Perfume bottle with minimalist design',
    title: 'Unleash Your Scent',
  },
  {
    src: 'https://images.pexels.com/photos/1645017/pexels-photo-1645017.jpeg',
    alt: 'Premium fragrance bottle in luxury setting',
    title: 'Crafted for Greatness',
  },
  {
    src: 'https://images.pexels.com/photos/10537090/pexels-photo-10537090.jpeg',
    alt: 'Elegant perfume bottle with gold accents',
    title: 'Define Your Essence',
  },
];


class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <Box sx={{ textAlign: 'center', py: 4, color: '#FFFFFF', backgroundColor: '#111111' }}>
          <Typography variant="h4">Something went wrong</Typography>
          <Typography variant="body1">
            Error: {this.state.error?.message || 'Unknown error'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
            Please try refreshing or check the console for details.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ backgroundColor: '#FFFFFF', color: '#111111' }}
          >
            Refresh
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

function Home() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  
  useEffect(() => {
    console.log('Home component mounted');
    const slider = sliderRef.current; 
    if (slider) {
      console.log('Slider ref initialized');
      try {
        slider.slickPlay(); 
      } catch (err) {
        console.error('Slider play error:', err);
      }
    }
    return () => {
      console.log('Home component unmounted');
      if (slider) {
        try {
          slider.slickPause(); 
        } catch (err) {
          console.error('Slider pause error:', err);
        }
      }
    };
  }, []);

 
  useEffect(() => {
    perfumeImages.forEach((image) => {
      const img = new Image();
      img.src = image.src;
      img.onerror = () => {
        console.error('Preload error for', image.src);
      };
      img.onload = () => {
        console.log('Preloaded:', image.src);
      };
    });
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, 
    arrows: true,
    pauseOnHover: false, 
    pauseOnDotsHover: false,
    pauseOnFocus: false,
    cssEase: 'linear', 
    lazyLoad: 'ondemand', 
    appendDots: (dots) => (
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          '& li.slick-active button:before': { color: '#FFFFFF' },
          '& li button:before': { color: '#AAAAAA', fontSize: '12px' },
        }}
      >
        <ul>{dots}</ul>
      </Box>
    ),
    prevArrow: (
      <Box
        component="button"
        sx={{
          color: '#FFFFFF',
          fontSize: '2rem',
          zIndex: 2,
          left: '20px',
          '&:before': { content: '"←"', fontSize: '2rem' },
          '&:hover': { color: '#E0E0E0' },
        }}
      />
    ),
    nextArrow: (
      <Box
        component="button"
        sx={{
          color: '#FFFFFF',
          fontSize: '2rem',
          zIndex: 2,
          right: '20px',
          '&:before': { content: '"→"', fontSize: '2rem' },
          '&:hover': { color: '#E0E0E0' },
        }}
      />
    ),
    onInit: () => console.log('Slider initialized'),
    onReInit: () => console.log('Slider re-initialized'),
    onSwipe: () => console.log('Slider swiped'),
    onEdge: (direction) => console.log('Slider reached edge:', direction),
    onLazyLoadError: (err) => console.error('Slider lazy load error:', err),
    afterChange: (index) => console.log('Slider changed to index:', index),
  };

  return (
    <ErrorBoundary>
      <Box
        sx={{
          backgroundColor: '#111111',
          minHeight: '100vh',
          color: '#FFFFFF',
          position: 'relative',
          margin: 0, 
          padding: 0, 
          top: 0, 
          left: 0,
          overflow: 'hidden',
        }}
      >
        {/* Hero Slider as Full Background */}
        <Slider
          ref={sliderRef}
          {...sliderSettings}
          style={{
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
          }}
        >
          {perfumeImages.map((image, index) => (
            <Box key={index} sx={{ position: 'relative', height: '100vh' }}>
              <Box
                component="img"
                src={image.src}
                alt={image.alt}
                loading="lazy"
                sx={{
                  width: '100vw',
                  height: '100vh',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: 0.7,
                  zIndex: -1,
                  margin: 0,
                  padding: 0,
                }}
                onError={(e) => {
                  console.error('Image load error for', image.src, ':', e.message);
                  e.target.src = 'https://via.placeholder.com/1920x1080';
                }}
                onLoad={() => console.log('Image loaded:', image.src)}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  px: 2,
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Helvetica Neue", Roboto, sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    lineHeight: 1.2,
                    mb: 2,
                    textTransform: 'uppercase',
                    textShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {image.title}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FFFFFF',
                    color: '#111111',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 'bold',
                    py: { xs: 1, md: 1.2 },
                    px: { xs: 2, md: 3 },
                    borderRadius: '50px',
                    '&:hover': { backgroundColor: '#E0E0E0' },
                  }}
                  onClick={() => {
                    try {
                      navigate('/products');
                    } catch (err) {
                      console.error('Navigation error:', err);
                      window.location.href = '/products';
                    }
                  }}
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </Button>
              </Box>
            </Box>
          ))}
        </Slider>

        {/* Featured Categories in Top-Right Corner */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '10px', sm: '20px' }, 
            right: { xs: '10px', sm: '20px' }, 
            zIndex: 3, 
            textAlign: 'right', 
            maxWidth: { xs: '150px', sm: '200px', md: '250px' }, 
            bgcolor: 'rgba(17, 17, 17, 0.7)',
            borderRadius: '8px',
            p: { xs: 1, sm: 2 }, 
          }}
          component={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Helvetica Neue", Roboto, sans-serif',
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 1,
              textTransform: 'uppercase',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
            }}
          >
            Shop by Category
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column', 
              gap: 1,
            }}
          >
            {['Men’s Fragrances', 'Women’s Fragrances', 'Designer Brands'].map((category) => (
              <Button
                key={category}
                variant="outlined"
                sx={{
                  borderColor: '#FFFFFF',
                  color: '#FFFFFF',
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                  fontWeight: 'bold',
                  py: 0.5,
                  px: 1.5,
                  borderRadius: '50px',
                  '&:hover': { backgroundColor: '#FFFFFF', color: '#111111' },
                  justifyContent: 'flex-end',
                }}
                onClick={() => {
                  try {
                    navigate(`/products?category=${encodeURIComponent(category)}`);
                  } catch (err) {
                    console.error('Category navigation error:', err);
                    window.location.href = `/products?category=${encodeURIComponent(category)}`;
                  }
                }}
                aria-label={`Shop ${category} fragrances`}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </ErrorBoundary>
  );
}

export default Home;