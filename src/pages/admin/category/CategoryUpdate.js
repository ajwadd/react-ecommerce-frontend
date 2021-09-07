import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForms from "../../../components/forms/CategoryForms";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        //console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <Grid item container direction="row">
      <Grid item xs={2}>
        <AdminNav />
      </Grid>

      <Grid xs={10} style={{ marginTop: "110px", paddingLeft: "35px" }}>
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <Typography variant="h6">Update category</Typography>
        )}
        {
          <CategoryForms
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        }
        <hr />
      </Grid>
    </Grid>
  );
};

export default CategoryUpdate;
