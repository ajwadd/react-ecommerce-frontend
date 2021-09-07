import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShopIcon from "@material-ui/icons/Shop";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { LineStyle } from "@material-ui/icons";

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
    name: "History",
    link: "/user/history",
    activeIndex: 0,
  },
  {
    icon: <ShopIcon />,
    name: "Password",
    link: "/user/password",
    activeIndex: 1,
  },
  {
    icon: <ShopTwoIcon />,
    name: "Wishlist",
    link: "/user/wishlist",
    activeIndex: 2,
  },
];

const UserNav = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
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

export default UserNav;
