/*import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from '../components/category/CategoryList'
import SubList from "../components/sub/SubList";


const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubList />


      <br />
      <br />
    </>
  );
};

export default Home; */

import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from "react-router-dom";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

import background from "../assets/background.png";
import Footer from "../components/home/Footer";

const useStyles = makeStyles((theme) => ({
  learnbutton: {
    ...theme.typography.learnbutton,
    fontSize: "0.9rem",
    height: 50,
    padding: 5,
    marginTop: "4em",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  background: {
    marginTop: "65px",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "40em",
    width: "100%",
  },
  h1color: {
    color: theme.palette.common.purple,
  },
  jumbotron: {
    color: "black",
    frontWeight: "bold",
    fontSize: "80px",
    fontFamily: "Helvetica Neue",
    color: "#FF0000",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid item container className={classes.background}>
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <Typography className={classes.jumbotron}>
              <Jumbotron
                text={["Latest Products", "New Arrivals", "Best Sellers"]}
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item container justify="center">
          <Typography gutterBottom variant="h2">
            New Arrivals
          </Typography>
        </Grid>
        <NewArrivals />
      </Grid>
      <Grid item container>
        <Grid item container justify="center">
          <Typography gutterBottom variant="h2">
            Best Sellers
          </Typography>
        </Grid>
        <BestSellers />
      </Grid>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <Typography gutterBottom variant="h2">
          Categories
        </Typography>
      </h4>
      <CategoryList />

      <h4 className="text-center  p-3 mt-5 mb-5 display-4  jumbotron ">
        <Typography gutterBottom variant="h2">
          Sub Categories
        </Typography>
      </h4>
      <SubList />
      <Grid item container>
        <Footer />
      </Grid>
    </>
  );
}
