import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";
import * as Scroll from "react-scroll";

const scroll = Scroll.animateScroll;

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: "100%",
    height: "200px",
    paddingBottom: "0px",
  },

  link: {
    color: "white",
    fontFamily: "Arial",
    fontSize: "0.85rem",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
  gridItem: {
    margin: "3em",
    marginTop: "70px",
  },
  icon: {
    height: "4em",
    width: "4em",
    [theme.breakpoints.down("xs")]: {
      height: "2.5em",
      width: "2.5em",
    },
  },
  socialContainer: {
    position: "relative",
    marginTop: "-6em",
    right: "1.5em",

    [theme.breakpoints.down("xs")]: {
      right: "0.6em",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    height: 35,
    padding: 5,
    color: "white",
    borderColor: "white",
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid item container justify="center" style={{ marginTop: "30px" }}>
      <footer className={classes.footer}>
        <Grid item container justify="center" className={classes.mainContainer}>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Button variant="outlined" className={classes.learnButton}>
                <Grid
                  item
                  component={Link}
                  to="/"
                  className={classes.link}
                  onClick={() => {
                    scroll.scrollToTop();
                  }}
                >
                  Home
                </Grid>
              </Button>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Button variant="outlined" className={classes.learnButton}>
                <Grid item component={Link} to="/shop" className={classes.link}>
                  Shop
                </Grid>
              </Button>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Button variant="outlined" className={classes.learnButton}>
                <Grid item component={Link} to="/cart" className={classes.link}>
                  Cart
                </Grid>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justify="flex-start">
          <Typography
            variant="h6"
            style={{
              color: "white",
              marginTop: "40px",
              fontSize: matchesMD ? "1em" : "inherit",
            }}
          >
            © Ecommerce 2021
          </Typography>
        </Grid>
      </footer>
      <Grid
        item
        container
        justify={matchesMD ? "center" : "flex-end"}
        spacing={2}
        className={classes.socialContainer}
      >
        <Grid
          item
          component={"a"}
          href="https://www.facebook.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="facebook logo" src={facebook} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.twitter.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="twitter logo" src={twitter} className={classes.icon} />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.instagram.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="instagram logo" src={instagram} className={classes.icon} />
        </Grid>
      </Grid>
    </Grid>
  );
}
