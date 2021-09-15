import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForms from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const intialState = {
  title: "MacBook PRO",
  description: "This is the best Apple Product",
  price: "45000",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "50",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "HP", "Samsung", "Microsoft", "lennovo", "Asus"],
  color: "white",
  brand: "Apple",
};

const ProductCreate = () => {
  const [values, setValues] = useState(intialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        // if(err.response.status === 400) {
        //     setLoading(false)
        //     toast.error(err.response.data)
        // }
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log(e.target.name, '----------', e.target.value)
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    console.log("CLICKED CATEGORY", e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <Grid item container direction="row">
      <Grid item xs={2}>
        <AdminNav />
      </Grid>
      <Grid xs={10} style={{ marginTop: "110px", paddingLeft: "35px" }}>
        {loading ? (
          <LoadingOutlined className="text-danger h1" />
        ) : (
          <Typography variant="h6">Product create</Typography>
        )}
        <hr />

        <div style={{ marginLeft: "28px", marginBottom: "10px" }}>
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
        </div>

        <ProductCreateForms
          values={values}
          showSub={showSub}
          subOptions={subOptions}
          handleCategoryChange={handleCategoryChange}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          setValues={setValues}
          showSub={showSub}
        />
      </Grid>
    </Grid>
  );
};

export default ProductCreate;
