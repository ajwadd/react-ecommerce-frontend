import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { getSub, updateSub } from "../../../functions/sub";
import CategoryForms from "../../../components/forms/CategoryForms";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        //console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is update`);
        history.push("/admin/sub");
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
        <AdminNav />{" "}
      </Grid>
      <Grid xs={10} style={{ marginTop: "110px", paddingLeft: "35px" }}>
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <Typography variant="h6">Create sub Category</Typography>
        )}

        <div className="form-group">
          <label>Parent Category</label>
          <select
            name="category"
            className="form-control"
            onChange={(e) => setParent(e.target.value)}
          >
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id} selected={c._id === parent}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {
          <CategoryForms
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        }
      </Grid>
    </Grid>
  );
};

export default SubUpdate;
