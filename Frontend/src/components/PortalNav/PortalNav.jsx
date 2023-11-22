import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as MessageBtn } from '../message-button.svg';
import { ReactComponent as NotificationBtn } from '../notification-button.svg';
import { ReactComponent as Profile } from '../profile.svg';
import './PortalNav.css';

function PortalNav() {
  const location = useLocation();

  const menu = [
    { name: 'Profile', path: '/profile'},
    { name: 'Sign out', path: '/logout'}
  ];
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const menuButtons = menu.map(item =>
  <MenuItem onClick={handleClose} component={Link} to={item.path}
  style={{
      fontWeight: location.pathname === item.path ? '600' : '500',
      color: '#7B9B69'
      }}>
      {item.name}
  </MenuItem>
  );

  return (
    <div className="portalBar">
      <div>
          <span className='customerSupport'>
              Customer support<strong>+1 800 123 4567</strong>
          </span>
          {/* <Button component={Link} to="/" className='messageButton'>
              <MessageBtn />
          </Button>
          <Button component={Link} to="/" className='notificationButton'>
              <NotificationBtn />
          </Button>
          */}
          <span className='welcomeUser'>Hi, {(sessionStorage.getItem('Name'))}!</span>

          <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
              <Profile />
          </Button>
          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
              'aria-labelledby': 'basic-button',
              }}
              style = {{
                  textAlign: 'center'
              }}>
              {menuButtons}
          </Menu>
      </div>
    </div>
  );
}

export default PortalNav;