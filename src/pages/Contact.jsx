import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!'); 
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
        Contact Us
      </Typography>
      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          backgroundColor: '#FFFFFF',
          p: 4,
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#FFFFFF' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            sx={{ backgroundColor: '#FFFFFF' }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#000000',
              mt: 2,
              '&:hover': { backgroundColor: '#333333' },
            }}
          >
            Send Message
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Contact;