import { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { getCartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#000000' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
        Ayo's Fragrance 
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate('/products')}>
          Products
        </Button>
        <Button color="inherit" onClick={() => navigate('/contact')}>
          Contact
        </Button>
        <Button color="inherit" onClick={() => navigate('/admin')}>
          Admin
        </Button>
        {user ? (
          <>
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
            <Typography sx={{ mx: 2, color: '#FFFFFF' }}>
              {user.email}
            </Typography>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </>
        )}
        <IconButton color="inherit" onClick={() => navigate('/cart')}>
          <Badge badgeContent={getCartCount()} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;