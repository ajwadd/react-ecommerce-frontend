import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const Wishlist = () => {
  const theme = useTheme();

  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      console.log(res.data);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <Grid item container>
      <Grid item xs={2}>
        <UserNav />
      </Grid>
      <Grid
        item
        xs={10}
        style={{ marginTop: "100px", paddingLeft: matches ? "31px" : "14px " }}
      >
        <h4>Wishlist</h4>

        {wishlist &&
          wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                onClick={() => handleRemove(p._id)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
      </Grid>
    </Grid>
  );
};

export default Wishlist;
