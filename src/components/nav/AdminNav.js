/* import React from 'react'
import: {Link} from 'react-router-dom'

const AdminNav = () => {
    return (>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin/dashboard"  className="nav-link">Dashboard</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/product" className="nav-link">Product</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/products" className="nav-link">Products</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/category" className="nav-link">category</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/sub" className="nav-link">Sub Category</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/coupon" className="nav-link">Coupon</Link>
                </li>

                <li className="nav-item">
                    <Link to="/user/password" className="nav-link">Password</Link>
                </li>
            </ul>
        </>
    )
} 

export default AdminNav */

/* import React from 'react'
import {Link} from 'react-router-dom'

const AdminNav = () => {
    return (
        <nav style={{marginTop: '100px'}}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin/dashboard"  className="nav-link">Dashboard</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/product" className="nav-link">Product</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/products" className="nav-link">Products</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/category" className="nav-link">category</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/sub" className="nav-link">Sub Category</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/coupon" className="nav-link">Coupon</Link>
                </li>

                <li className="nav-item">
                    <Link to="/user/password" className="nav-link">Password</Link>
                </li>
            </ul>
        </nav>
    )
} 

export default AdminNav */
import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import CategoryIcon from "@material-ui/icons/Category";
import ShopIcon from "@material-ui/icons/Shop";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import Drawer from "@material-ui/core/Drawer";

import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Link, useLocation } from "react-router-dom";

// external
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    flex: 1,
    height: "calc(100vh - 50px)",
    backgroundColor: "white",
    position: "sticky",
    top: "70px",
    padding: "20px",
    marginBottom: "10px",
    marginTop: "80px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "60px",
      width: "110px",
    },
  },

  sidebarList: {
    listStyle: "none",
    padding: "5px",
  },

  sidebarListItem: {
    padding: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontFamily: "Source Sans Pro , sans-serif",
    color: "black",
    borderRadius: "10px",
    "&&:actif": {
      "&&:hover": {
        backgroundColor: "blue",
      },
    },
  },

  NavItem: {
    color: "black",
    postion: "relative",
    opacity: 0.7,
    display: "inline",
    margin: "0 0",
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
      "&&:hover": {
        backgroundColor: "#035AE0",
      },
    },
  },
  navigationDrawer: {
    width: 240,
    border: "none",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    position: "relative",
    height: "100vh",
  },
  navigationDrawerCollapse: {
    width: theme.spacing(9),
  },
  navigationToolbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: theme.spacing(1),
    ...theme.mixins.toolbar,
  },
  navigationToolbarCollapse: {
    justifyContent: "center",
    paddingRight: 0,
  },
  navigationList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },

  navigationSpacer: {
    flex: 1,
  },
  menuItemIcon: {
    width: "100%",
  },
  menuItem: {
    width: "80%",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  menuItemActive: {
    backgroundColor: "#EBEBEC",
  },
}));

const ItemsSideBar = [
  {
    icon: <LineStyle />,
    activeIcon: <LineStyle style={{ color: "blue" }} />,
    name: "Dashboard",
    link: "/admin/dashboard",
    activeIndex: 0,
  },
  {
    icon: <ShopIcon />,
    activeIcon: <ShopIcon style={{ color: "blue" }} />,
    name: "Product",
    link: "/admin/product",
    activeIndex: 1,
  },
  {
    icon: <ShopTwoIcon />,
    activeIcon: <ShopTwoIcon style={{ color: "blue" }} />,
    name: "Products",
    link: "/admin/products",
    activeIndex: 2,
  },
  {
    icon: <CategoryIcon />,
    activeIcon: <CategoryIcon style={{ color: "blue" }} />,
    name: "Category",
    link: "/admin/category",
    activeIndex: 3,
  },
  {
    icon: <LineStyle />,
    activeIcon: <LineStyle style={{ color: "blue" }} />,
    name: "Sub Category",
    link: "/admin/sub",
    activeIndex: 4,
  },
  {
    icon: <LineStyle />,
    activeIcon: <LineStyle style={{ color: "blue" }} />,
    name: "Coupon",
    link: "/admin/coupon",
    activeIndex: 5,
  },
  {
    icon: <LineStyle />,
    activeIcon: <LineStyle style={{ color: "blue" }} />,
    name: "Password",
    link: "/user/password",
    activeIndex: 6,
  },
];

const AdminNav = () => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();

  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(false);

  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    setActive(location.pathname === ItemsSideBar.link);
  }, [location, ItemsSideBar.path]);

  const toggleNavigation = () => {
    setOpen(!open);
  };

  const closeNavigation = () => {
    if (matches) {
      setOpen(false);
    }
  };

  return (
    <>
      {/*      <List disablePadding className={classes.sidebar}>
        {ItemsSideBar.map((route) => (
          <ListItem
            divider
            key={`${route}${route.activeIndex}`}
            button
            component={Link}
            to={route.link}
            selected={value === route.activeIndex}
            classes={{ selected: classes.drawerItemSelected }}
            onClick={() => {
              setValue(route.activeIndex);
            }}
          >
            <ListItemText className={classes.NavItem} disableTypography>
              <Grid item container direction="row" justify="space-between">
                <Grid item>{route.icon}</Grid>
                <Grid item>
                  <b>{route.name}</b>
                </Grid>
              </Grid>
            </ListItemText>
          </ListItem>
        ))}
      </List> */}

      <Drawer
        style={{ marginTop: "100px" }}
        classes={{
          paper: clsx(
            classes.navigationDrawer,
            !open && classes.navigationDrawerCollapse
          ),
        }}
        variant={matches ? "temporary" : "permanent"}
        open={open}
      >
        <div
          className={clsx(
            classes.navigationToolbar,
            !open && classes.navigationToolbarCollapse
          )}
        >
          <IconButton onClick={toggleNavigation}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </div>

        <List disablePadding className={classes.navigationList}>
          {ItemsSideBar.map((route) => (
            <ListItem
              divider
              key={route}
              button
              component={Link}
              to={route.link}
              className={clsx(
                classes.menuItem,
                active && classes.menuItemActive
              )}
              onClick={closeNavigation}
            >
              <ListItemIcon>
                <Icon>{active ? route.activeIcon : route.icon}</Icon>
              </ListItemIcon>
              <ListItemText
                primary={route.name}
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default AdminNav;
