import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { EnumPage, routeURL } from '../helpers/url';
import { IUserContext, UserAuthState, UserContext } from './User/UserContext';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    'min-height': 0
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function SiteHeader(): any {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const userContext = useContext(UserContext) as IUserContext;
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    userContext.logout();
    history.push(routeURL(EnumPage.Index));
  };

  const handleRedirectAndCloseDrawer = (path?: string) => {
    setIsDrawerOpen(false);
    if (path !== undefined) {
      history.push(path);
    }
  };

  const componentDrawerUserUnauthed = (
    <>
      <ListItem button key={'user_login'}
                component={Link} to={routeURL(EnumPage.Login)}
                onClick={() => handleRedirectAndCloseDrawer()}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary={'Login / Signup'} />
      </ListItem>
    </>
  );

  const componentDrawerUserAuth = (
    <>
      <ListItem button key={'user_profile'}
                component={Link} to={routeURL(EnumPage.Profile)}
                onClick={() => handleRedirectAndCloseDrawer()}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary={'Profile'} />
      </ListItem>

      <ListItem button key={'user_logout'} onClick={() => {
        handleLogout();
        setIsDrawerOpen(false);
      }}>
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary={'Log out'} />
      </ListItem>
    </>
  );

  const componentAppBarLogin = (
    <Button color="inherit" onClick={() => history.push('/login/')}>Login</Button>
  );

  const componentAppBarProfile = (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleMenuClose();
          history.push('/profile/');
        }}>Profile</MenuItem>

        <MenuItem onClick={() => {
          handleMenuClose();
          handleLogout();
        }}>Logout</MenuItem>
      </Menu>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                      onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>

          {userContext.userAuthState === UserAuthState.AUTHED
            ? componentAppBarProfile
            : componentAppBarLogin}
        </Toolbar>
      </AppBar>

      <Drawer open={isDrawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem button key={'dashboard'}
                    component={Link} to={routeURL(EnumPage.Index)}
                    onClick={() => handleRedirectAndCloseDrawer()}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>

          <ListItem button key={'bill_create'}
                    component={Link} to={routeURL(EnumPage.EntryNew)}
                    onClick={() => handleRedirectAndCloseDrawer()}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary={'Create Transaction'} />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button key={'all_enum'}
                    component={Link} to={routeURL(EnumPage.AllEnum)}
                    onClick={() => handleRedirectAndCloseDrawer()}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary={'All Enum'} />
          </ListItem>
        </List>

        <Divider />

        {/* User Action */}
        <List subheader={
          <ListSubheader component="div" id="list-subheader-account">
            Account
          </ListSubheader>
        }>
          {userContext.userAuthState === UserAuthState.AUTHED
            ? componentDrawerUserAuth
            : componentDrawerUserUnauthed}
        </List>
      </Drawer>
    </>
  );
}

export default SiteHeader;
