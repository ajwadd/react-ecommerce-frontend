import React, { useState, useEffect } from "react";
import { getSubs } from "../../functions/sub";
import { Link } from "react-router-dom";
import ProductCard from "../cards/ProductCard";
import CategoryList from "../category/CategoryList";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link style={{ color: "#FFBA60" }} to={`/sub/${s.slug}`}>
          {s.name}
        </Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
