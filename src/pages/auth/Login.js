import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Visibility from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import revolutionBackground from "../../assets/repeatingBackground.svg";

const useStyles = makeStyles((theme) => ({
  revolutionBackground: {
    backgroundImage: `url(${revolutionBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
  },
  LoginDefault: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: "1rem",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
  LoginGoogle: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: "1rem",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //console.log(email, password)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      //console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      //history.push('/')
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));

        //history.push('/')
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <Grid
        item
        style={{ marginBottom: "0.5em" }}
        style={{ width: "30em", marginBottom: "30px", marginTop: "20px" }}
      >
        <TextField
          label="Email"
          id="email"
          fullWidth
          placeholder="Your email"
          autoFocus
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item style={{ marginBottom: "0.5em" }}>
        <TextField
          label="Password"
          id="password"
          fullWidth
          placeholder="Your Password"
          autoFocus
          autoComplete="current-password"
          variant="outlined"
          type="password"
          value={password}
          icon={<Visibility />}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>

      <br />
    </form>
  );
  return (
    <Grid item container className={classes.revolutionBackground}>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        style={{ marginTop: "150px" }}
        xs={12}
      >
        <Card variant="outlined" style={{ borderRadius: "5%" }}>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            style={{ marginTop: "20px" }}
          >
            {loading ? (
              <Typography variant="h4">Loading...</Typography>
            ) : (
              <Typography variant="h4" align="center">
                <b>Login</b>
              </Typography>
            )}
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <Grid item container direction="column" alignItems="center">
              {loginForm()}
            </Grid>

            <Grid
              item
              container
              justify="center"
              style={{ marginBottom: "10px" }}
            >
              <Button
                onClick={handleSubmit}
                type="primary"
                className={classes.LoginDefault}
                size="large"
                fullWidth
                disabled={!email || password.length < 6}
              >
                Login with Email/Password
              </Button>
            </Grid>
            <Grid
              item
              container
              justify="center"
              style={{ marginBottom: "10px" }}
            >
              <Button
                onClick={googleLogin}
                variant="contained"
                fullWidth
                className={classes.LoginGoogle}
              >
                Login with Google
              </Button>
            </Grid>

            <Grid item container justify="center">
              <Link to="/forgot/password" className="float-right text-danger">
                <b>Forgot Password</b>
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
