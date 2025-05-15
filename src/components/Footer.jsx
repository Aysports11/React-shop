import { Link } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <Container component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ textAlign: 'center', padding: '20px', marginTop: 'auto', background: '#6B4E71', color: 'white' }}>
      <Typography variant="body2">
        © 2025 Fragrance Boutique. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link to="/contact" style={{ color: '#FFD700' }}>Contact Us</Link> | <a href="mailto:support@fragranceboutique.com" style={{ color: '#FFD700' }}>Email</a>
      </Typography>
    </Container>
  );
}

export default Footer;