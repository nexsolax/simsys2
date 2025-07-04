import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import { ToastContainer } from 'react-toastify';

import Sidebar from './Sidebar';
import { cartIcon, notificationIcon, searchIcon, settingIcon } from '../../shared/icon/icon';
import { MENU_ITEMS } from './menu';
import { useStore } from '../../store';
import Cart from '../cart/Cart';

const drawerWidth = 240;

const Layout: React.FC = () => {
  const location = useLocation();
  const currentPathName = location.pathname.split('/').pop() || 'Overview';
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const user = useStore((state) => state.auth.user);
  const [isShowCart, setIsShowCart] = useState(false);
  const cartItems = useStore((state) => state.cart.cart);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 0,
            borderRadius: 0,
            padding: 0,
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: `calc(100vw - ${drawerWidth}px)`,
        }}
      >
        {/* Header */}
        <AppBar
          position='sticky'
          sx={{
            py: 0.5,
            bgcolor: 'white',
            boxShadow: 'none',
            pl: '28px',
            pr: '40px',
            bgColor: 'rgba(255, 255, 255, 0.36)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Toolbar sx={{ p: '0 !important' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  placeholder='Search...'
                  variant='outlined'
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <img width={18} src={searchIcon} alt='' />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    ml: 2,
                    '.MuiInputBase-adornedStart': {
                      paddingLeft: '8px',
                    },
                    '.MuiOutlinedInput-input': {
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      fontSize: '12px',
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton>
                  <img width={24} height={24} src={notificationIcon} alt='' />
                </IconButton>
                <IconButton onClick={() => setIsOpenSetting(true)}>
                  <img width={24} height={24} src={settingIcon} alt='' />
                </IconButton>
                <IconButton onClick={() => setIsShowCart(!isShowCart)}>
                  <Badge badgeContent={cartItems?.length} color='warning'>
                    <img width={24} height={24} src={cartIcon} alt='' />
                  </Badge>
                </IconButton>
                <Box>
                  <IconButton onClick={(e: any) => setAnchorEl(e.currentTarget)}>
                    <Avatar
                      sx={{ ml: 1, width: 40, height: 40 }}
                      alt='User'
                      src='https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp'
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem
                      sx={{
                        fontSize: '12px',
                        color: 'var(--palette-text-secondary)',
                        fontWeight: 600,
                      }}
                    >
                      {user?.role}
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/dashboard/profile')}>Profile</MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        setOpenLogoutDialog(true);
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>

                  <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogContent>
                      <Typography>Are you sure you want to logout?</Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenLogoutDialog(false)}>Cancel</Button>
                      <Button
                        onClick={() => {
                          setOpenLogoutDialog(false);
                          logout();
                          navigate('/login');
                        }}
                        variant='contained'
                        color='primary'
                      >
                        Logout
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Box>
            </Box>
          </Toolbar>

          <Drawer
            anchor='right'
            open={isOpenSetting}
            onClose={() => setIsOpenSetting(false)}
            sx={{
              width: 350,
              flexShrink: 0,

              [`& .MuiDrawer-paper`]: {
                width: 350,
                boxSizing: 'border-box',
                border: 0,
                borderRadius: 0,
                padding: 0,
              },
            }}
          >
            <Box sx={{ py: 2 }}>
              <Typography sx={{ px: 2 }} variant='h4'>
                Notifications
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', gap: 2, p: 2, mb: 1 }}>
                  <Avatar
                    alt='User'
                    src='https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp'
                  />
                  <Box>
                    <Typography
                      variant='body1'
                      fontWeight={600}
                      color='var(--palette-text-primary)'
                    >
                      Notification title
                    </Typography>
                    <Typography variant='caption' color='var(--palette-text-secondary)'>
                      Notification description
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Drawer>
        </AppBar>

        {/* Page Content */}
        <Box
          component='main'
          sx={{
            position: 'relative',
            flexGrow: 1,
            px: '40px',
            py: 2,
            bgcolor: 'var(--palette-background-paper)',
            minHeight: 'calc(100vh - 72px)',
          }}
        >
          <Stack sx={{ mb: 4 }} spacing={2}>
            <Typography variant='h3'>
              {currentPathName
                ? currentPathName[0].toLocaleUpperCase() + currentPathName.slice(1)
                : ''}
            </Typography>

            {location.pathname.length > 0 && (
              <Breadcrumbs
                sx={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--palette-text-primary)',
                  textTransform: 'capitalize',
                }}
                separator='•'
                aria-label='breadcrumb'
              >
                <Typography fontSize={'13px'} fontWeight={500}>
                  {location.pathname.split('/')[1]}
                </Typography>
                {location.pathname.split('/')[2] && (
                  <Typography fontSize={'13px'} fontWeight={500}>
                    {location.pathname.split('/')[2]}
                  </Typography>
                )}
                {location.pathname.split('/')[3] && (
                  <Typography
                    fontSize={'13px'}
                    fontWeight={500}
                    sx={{ color: 'var(--palette-text-secondary)' }}
                  >
                    {location.pathname.split('/')[3]}
                  </Typography>
                )}
              </Breadcrumbs>
            )}
          </Stack>
          <Outlet />
        </Box>
      </Box>
      {isShowCart && <Cart />}
      <ToastContainer />
    </Box>
  );
};

export default Layout;
