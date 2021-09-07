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
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import CategoryIcon from "@material-ui/icons/Category";
import ShopIcon from "@material-ui/icons/Shop";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";
import Grid from "@material-ui/core/Grid";

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
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    flex: 1,
    height: "calc(100vh - 50px)",
    backgroundColor: "#0064FF",
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
    color: "white",
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
}));

const ItemsSideBar = [
  {
    icon: <LineStyle />,
    name: "Dashboard",
    link: "/admin/dashboard",
    activeIndex: 0,
  },
  {
    icon: <ShopIcon />,
    name: "Product",
    link: "/admin/product",
    activeIndex: 1,
  },
  {
    icon: <ShopTwoIcon />,
    name: "Products",
    link: "/admin/products",
    activeIndex: 2,
  },
  {
    icon: <CategoryIcon />,
    name: "Category",
    link: "/admin/category",
    activeIndex: 3,
  },
  {
    icon: <LineStyle />,
    name: "Sub Category",
    link: "/admin/sub",
    activeIndex: 4,
  },
  {
    icon: <LineStyle />,
    name: "Coupon",
    link: "/admin/coupon",
    activeIndex: 5,
  },
  {
    icon: <LineStyle />,
    name: "Password",
    link: "/user/password",
    activeIndex: 6,
  },
];

const AdminNav = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <List disablePadding className={classes.sidebar}>
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
    </List>
  );
};

export default AdminNav;
