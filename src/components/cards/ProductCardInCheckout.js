import React from "react";
import laptop from "../../images/laptop.jpg";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    console.log("quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div style={{ width: "100px", height: "auto" }}>
          {p.images.length ? (
            <ModalImage small={p.images[0].url} large={p.images[0].url} />
          ) : (
            <ModalImage small={laptop} large={laptop} />
          )}
        </div>
      </TableCell>
      <TableCell>{p.title}</TableCell>
      <TableCell>{p.price}</TableCell>
      <TableCell>{p.brand}</TableCell>
      <TableCell>
        <select
          onChange={handleColorChange}
          name="color"
          className="form-control"
        >
          {p.color ? (
            <option value={p.color}>{p.color}</option>
          ) : (
            <option>Select</option>
          )}
          {colors
            .filter((c) => c !== p.color)
            .map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
      </TableCell>
      <TableCell className="text-center">
        <input
          type="number"
          className="form-control"
          value={p.count}
          onChange={handleQuantityChange}
        ></input>
      </TableCell>
      <TableCell className="text-center">
        {p.shipping === "Yes" ? (
          <CheckCircleOutlined className="text-success" />
        ) : (
          <CloseCircleOutlined className="text-danger" />
        )}
      </TableCell>
      <TableCell className="text-center">
        <CloseOutlined onClick={handleRemove} className="text-danger pointer" />
      </TableCell>
    </TableRow>
  );
};

export default ProductCardInCheckout;
