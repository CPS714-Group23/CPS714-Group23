import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import './Nav.css';

function Navbar() {
  const buttonStyle = {
    fontSize: '18px',
    fontFamily: 'Raleway, sans-serif',
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        <div className="left-nav">
          <Button color="inherit" href="/" style={buttonStyle}>
            Home
          </Button>
          <Button color="inherit" href="/contact" style={buttonStyle}>
            Contact
          </Button>
          <Button color="inherit" href="/about" style={buttonStyle}>
            About 
          </Button>
        </div>
        <div className="right-nav" style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" color="primary" href="/signup" style={buttonStyle}>
            SignUp
          </Button>
          <Box marginLeft={2}>
            <Button variant="contained" color="primary" href="/login" style={buttonStyle}>
              Login
            </Button>
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
