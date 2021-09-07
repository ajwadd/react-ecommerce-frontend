import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCategories } from "../../../functions/category";
import { createSub, getSubs, removeSub } from "../../../functions/sub";
import CategoryForms from "../../../components/forms/CategoryForms";
import LocalSearch from "../../../components/forms/LocalSearch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);

  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        //console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  const handleRemove = async (slug) => {
    // let answer = window.confirm("Are sure you want Delete?")
    // console.log(answer,slug)
    if (window.confirm("Are sure you want Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`"${res.data.name}" is deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
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
        {/* step 2 */}
        {<LocalSearch keyword={keyword} setKeyword={setKeyword} />}
        {/* step 5 */}
        {subs.filter(searched(keyword)).map((s) => (
          <div className="alert alert-secondary" key={s._id}>
            {s.name}
            <span
              onClick={() => handleRemove(s.slug)}
              className="btn btn-sm float-right"
            >
              <DeleteOutlined className="text-danger" />
            </span>
            <Link to={`/admin/sub/${s.slug}`}>
              <span className="btn btn-sm float-right">
                <EditOutlined className="text-warning" />
              </span>
            </Link>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default SubCreate;
