import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(password);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <Grid item container direction="row">
      <Grid item xs={2}>
        <UserNav />{" "}
      </Grid>
      <Grid xs={10} style={{ marginTop: "120px", paddingLeft: "35px" }}>
        {loading ? (
          <h4 className="text-danger">Loading</h4>
        ) : (
          <Typography variant="h6">Password Update</Typography>
        )}
        {passwordUpdateForm()}
      </Grid>
    </Grid>
  );
};

export default Password;
