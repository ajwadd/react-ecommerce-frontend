/*import React, {useState} from 'react'
import { Menu, Badge } from 'antd';
import {ShoppingCartOutlined, ShoppingOutlined, AppstoreOutlined,LogoutOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import firebase from "firebase/app";
import "firebase/auth";
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Search from '../forms/Search';

const { SubMenu, Item } = Menu;

function Header() {
     
    const [current, setCurrent] = useState("home")
    let dispatch = useDispatch()
    let {user, cart} = useSelector((state) => ({...state}));
    let history = useHistory()

    const handleClick = (e) => {
        //console.log(e.key)
        setCurrent(e.key)
    }

    const logout = () => {
      firebase.auth().signOut()
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      history.push("/login")
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>

        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop</Link>
        </Item>
         
         
         <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
          </Link>
         </Item>
         
        
         {!user && (
           <Item key="register" icon={<UserAddOutlined />}  className="float-right">
           <Link to="/register">Register</Link>
           </Item>
         )}
         {!user && (
          <Item key="login" icon={<UserOutlined />}  className="float-right">
          <Link to="/login">Login</Link>
          </Item>
          )}
           
          {user && (
           <SubMenu 
           key="SubMenu" 
           icon={<SettingOutlined />} 
           title={user.email && user.email.split('@')[0]} 
           className="float-right"
           >
           
           {
             user && user.role === 'subscriber' && (
             <Item>
               <Link to="/user/history"></Link>
                Dashboard
             </Item>)
           }

           {
             user && user.role === 'admin' && (
             <Item>
               <Link to="/admin/dashboard"></Link>
               Dashboard
             </Item>)
           }
            
           <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
           </SubMenu>
          )}
 
        
       <span className='float-right p-1'>
         <Search />
       </span>
      </Menu>
    )
}

export default Header */

import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Search from "../forms/Search";
import firebase from "firebase/app";
import "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ShopIcon from "@material-ui/icons/Shop";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import Grid from "@material-ui/core/Grid";
import SettingsIcon from "@material-ui/icons/Settings";
import { Badge } from "antd";

const { count, offset } = Badge;

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    marginRight: "auto",
  },
  tab: {
    ...theme.typography.tab,
    display: "inline",
    padding: "10px",
    minWidth: 15,
    marginLeft: "25px",
    color: "black",
    "&:hover": {
      backgroundColor: "none",
    },
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "40px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },

  drawerIcon: {
    height: "50px",
    width: "50px",
    color: theme.palette.common.blue,
  },
  drawerIconContainer: {
    marginRight: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
    marginTop: "74px",
    width: "100px",
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },

  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appbar: {
    // zIndex: theme.zIndex.modal + 1,
    backgroundColor: "#FFF",
  },
  RegisterButton: {
    fontFamily: "Pacifico",
    fontSize: "0.25rem",
    marginLeft: "5px",
    textTransform: "none",
    color: "white",
    backgroundColor: theme.palette.common.orange,
    height: 30,
    width: 100,
    fontSize: "1.25rem",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  LoginButton: {
    fontFamily: "Pacifico",
    fontSize: "0.25rem",
    textTransform: "none",
    height: 30,
    width: 100,
    fontSize: "1.25rem",
    "&:hover": {
      background: theme.palette.primary.light,
      color: "white",
    },
  },
  menu: {
    marginTop: "64px",
  },

  iconDiv: {
    "&>p": {
      color: "red",
    },
    "&>svg": {
      color: "green",
      cursor: "pointer",
    },
  },
  icon1: {
    color: "blue",
  },
  icon2: {
    color: "red",
  },
  btnEmail: {
    [theme.breakpoints.down("md")]: {
      width: "155px",
      fontSize: "0.70rem",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  let dispatch = useDispatch();
  let history = useHistory();
  let { user, cart } = useSelector((state) => ({ ...state }));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const routes = [
    { icon: <HomeIcon />, name: "Home", link: "/", activeIndex: 0 },
    {
      icon: <ShopIcon className={classes.icon1} />,
      name: "Shop",
      link: "/shop",
      activeIndex: 1,
      badge: { count: [cart].length, offset: [9, 0] },
    },
    {
      icon: <LocalGroceryStoreIcon className={classes.icon2} />,
      name: "Cart",
      link: "/cart",
      activeIndex: 2,
    },
  ];

  useEffect(() => {
    [...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
            if (
              route.selectedIndex &&
              route.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }
          break;

        default:
          break;
      }
    });
  }, [props.value, props.selectedIndex, routes, props]);

  const handleSetActive = () => {
    console.log("hi");
  };

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value}
        // onClick={scroll}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <Tab
            Badge={route.badge}
            icon={route.icon}
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
          />
        ))}
      </Tabs>
    </React.Fragment>
  );

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  const renderMenuItem = (user) => {
    if (user && user.role === "subscriber") {
      return (
        <MenuItem component={Link} to="/user/history" onClick={handleClose}>
          User Dashboard
        </MenuItem>
      );
    } else {
      return (
        <MenuItem component={Link} to="/admin/dashboard" onClick={handleClose}>
          Admin Dashboard
        </MenuItem>
      );
    }
  };

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              to={route.link}
              selected={props.value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>

      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <AppBar className={classes.appbar} variant="outlined">
        <Toolbar disableGutters>
          {matchesMD ? drawer : tabs}
          <Search />
          {!user && (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              className={classes.LoginButton}
              color="primary"
            >
              Login
            </Button>
          )}
          {!user && (
            <Button variant="contained" className={classes.RegisterButton}>
              <Link to="/register" className={classes.RegisterButton}>
                Register
              </Link>
            </Button>
          )}
          {user && (
            <Button
              variant="contained"
              color="primary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              align="float-right"
              className={classes.btnEmail}
            >
              <Grid item container justify="center">
                <Grid item style={{ marginRight: "7px" }}>
                  {user.email && user.email.split("@")[0]}
                </Grid>
                <Grid item>
                  <SettingsIcon />
                </Grid>
              </Grid>
            </Button>
          )}

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menu}
          >
            {renderMenuItem(user)}

            <MenuItem onClick={logout}>logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
