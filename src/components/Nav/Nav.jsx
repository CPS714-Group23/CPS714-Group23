import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

function Navbar() {
  const buttonStyle = {
    fontSize: '20px',
    fontFamily: 'Raleway, sans-serif',
  };

  const location = useLocation();

  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar className="toolbar">
        <div className="left-nav">
          <Button
            color="inherit"
            component={Link}
            to="/"
            style={{
              ...buttonStyle,
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
              opacity: location.pathname === '/' ? 1 : 0.7,
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/contact"
            style={{
              ...buttonStyle,
              fontWeight: location.pathname === '/contact' ? 'bold' : 'normal',
              opacity: location.pathname === '/contact' ? 1 : 0.7,
            }}
          >
            Contact
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/about"
            style={{
              ...buttonStyle,
              fontWeight: location.pathname === '/about' ? 'bold' : 'normal',
              opacity: location.pathname === '/about' ? 1 : 0.7,
            }}
          >
            About
          </Button>
        </div>
        <div className="right-nav" style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            color="inherit"
            component={Link}
            to="/signup"
            style={{
              ...buttonStyle,
              fontWeight: location.pathname === '/signup' ? 'bold' : 'normal',
              opacity: location.pathname === '/signup' ? 1 : 0.7,
            }}
          >
            SignUp
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            style={{
              ...buttonStyle,
              fontWeight: location.pathname === '/login' ? 'bold' : 'normal',
              opacity: location.pathname === '/login' ? 1 : 0.7,
            }}
          >
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;