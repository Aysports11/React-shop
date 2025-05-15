import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { AppBar, Toolbar, Typography, Button, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';

function Navbar() {
 const { user, logout } = useContext(AuthContext);
 const { itemCount } = useContext(CartContext);
 const navigate = useNavigate();

 const handleLogout = () => {
 logout();
 navigate('/');
 };

 return (
 <AppBar position="sticky" sx={{ background: 'rgba(74, 44, 107, 0.9)', borderBottom: '2px solid #D4A017' }}>
 <Toolbar sx={{ justifyContent: 'space-between' }}>
 <Typography
 variant="h6"
 sx={{ fontFamily: "'Playfair Display', serif", color: '#D4A017' }}
 component={motion.div}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.5 }}
 >
  AYO's Fragrance
 </Typography>
 <Box sx={{ display: 'flex', gap: 2 }}>
 <Button
 color="inherit"
 component={Link}
 to="/"
 sx={{ color: '#FFFFFF', '&:hover': { color: '#D4A017' } }}
 >
 Home
 </Button>
 <Button
 color="inherit"
 component={Link}
 to="/products"
 sx={{ color: '#FFFFFF', '&:hover': { color: '#D4A017' } }}
 >
 Products
 </Button>
 <Button
 color="inherit"
 component={Link}
 to="/cart"
 sx={{ color: '#FFFFFF', '&:hover': { color: '#D4A017' } }}
 >
 <Badge badgeContent={itemCount} color="secondary">
 <ShoppingCartIcon />
 </Badge>
 Cart
 </Button>
 <Button
 color="inherit"
 component={Link}
 to="/contact"
 sx={{ color: '#FFFFFF', '&:hover': { color: '#D4A017' } }}
 >
 Contact
 </Button>
 {user ? (
 <>
 {user.isAdmin && (
 <Button
 color="inherit"
 component={Link}
 to="/admin"
 sx={{ color: '#FFFFFF', '&:hover': { color: '#D4A017' } }}
 >
 Admin
 </Button>
 )}
 <Button
 color="inherit"
 onClick={handleLogout}
 sx={{ color: '#FFFFFF', '&:hover': { color: '#D4A017' } }}
 >
 Logout
 </Button>
 </>
 ) : (
 <>
 <Button
 color="inherit"
 component={Link}
 to="/signup"
 sx={{ color: '#FFFFFF', '&:hover': { color: '#D4A017' } }}
 >
 Sign Up
 </Button>
 <Button
 color="inherit"
 component={Link}
 to="/login"
 sx={{ color: '#FFFFFF', '&:hover': { color: '#D4A017' } }}
 >
 Login
 </Button>
 </>
 )}
 </Box>
 </Toolbar>
 </AppBar>
 );
}

export default Navbar;