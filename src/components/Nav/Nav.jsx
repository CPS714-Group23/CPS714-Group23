import React from 'react';
import { Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from './logo.svg';
import './Nav.css';

function Navbar() {
  const location = useLocation();
  const menu = [
    { name: 'Services', path: '/services'},
    { name: 'About', path: '/about'}
  ];
  const menuButtons = menu.map(item =>
    <Button component={Link} to={item.path}
      style={{
        fontWeight: location.pathname === item.path ? '600' : '500'
      }}>
      {item.name}
    </Button>
  )

  return (
    <div className="navbar">
      <div className="left-nav">
        <Logo />
        <Button component={Link} to="/" id='logoButton'>
          Pharmaceutical Portal
        </Button>
      </div>
      <div className="right-nav" style={{ display: 'flex', alignItems: 'center' }}>
        {menuButtons}
        <Button component={Link} to="/login" id='logInButton'
          style={{
            fontWeight: location.pathname === '/login' ? '600' : '500'
          }}>
          Log In
        </Button>
        <Button component={Link} to="/signup" id='registerButton'
          style={{
            fontWeight: location.pathname === '/signup' ? '600' : '500'
          }}>
          Register
        </Button>
      </div>
    </div>
  );
}

export default Navbar;