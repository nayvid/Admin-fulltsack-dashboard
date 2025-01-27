import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton, Button, Typography } from '@mui/material';
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { shades } from '../../theme';
import { setIsCartOpen, logout } from '../../state';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Safe selectors with fallbacks
  const cart = useSelector((state) => state.cart?.cart ?? []);
  const auth = useSelector((state) => state.cart?.auth ?? {
    isAuthenticated: false,
    user: null
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{
            '&:hover': { cursor: "pointer" },
            transition: 'color 0.3s ease'
          }}
          color={shades.secondary[900]}
          fontSize="30px"
        >
          Nike
        </Box>
        
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          alignItems="center"
          zIndex="2"
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>

          {auth.isAuthenticated ? (
            <>
              <Typography 
                sx={{ 
                  color: 'black',
                  fontSize: '14px'
                }}
              >
                Welcome, {auth.user?.username}
              </Typography>
              <Button 
                onClick={handleLogout}
                sx={{
                  color: 'black',
                  backgroundColor: shades.neutral[100],
                  '&:hover': {
                    backgroundColor: shades.neutral[200]
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    color: 'black',
                    backgroundColor: shades.neutral[100],
                    '&:hover': {
                      backgroundColor: shades.neutral[200]
                    }
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    color: 'black',
                    backgroundColor: shades.neutral[100],
                    '&:hover': {
                      backgroundColor: shades.neutral[200]
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          <Badge
            badgeContent={cart.length}
            color='secondary'
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "20px",
                minWidth: "15px",
              },
            }}
          >
            <IconButton 
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{
                color: "black",
                '&:hover': {
                  backgroundColor: shades.neutral[100]
                }
              }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>

          <IconButton 
            sx={{
              color: "black",
              '&:hover': {
                backgroundColor: shades.neutral[100]
              }
            }}
          >
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;