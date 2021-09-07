import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons();
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons();
          setLoading(false);
          toast.error(`Coupon ${res.data.name} is deleted`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Grid item container direction="row">
      <Grid item xs={2}>
        <AdminNav />{" "}
      </Grid>
      <Grid xs={10} style={{ marginTop: "110px", paddingLeft: "35px" }}>
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <Typography variant="h6">Coupon</Typography>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Discount %</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Expiry</label>
            <br />
            <DatePicker
              className="form-control"
              selected={new Date()}
              value={expiry}
              onChange={(date) => setExpiry(date)}
              required
            />
          </div>

          <button className="btn btn-outline-primary">save</button>
        </form>
        <br />
        <h4>{coupons.length} Coupons</h4>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Expiry</th>
              <th scope="col">Discount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{new Date(c.expiry).toLocaleDateString()}</td>
                <td>{c.discount}%</td>
                <td>
                  <DeleteOutlined
                    onClick={() => handleRemove(c._id)}
                    className="text-danger pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default CreateCouponPage;
