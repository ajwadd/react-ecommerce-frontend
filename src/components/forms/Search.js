import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    borderRadius: "5px",
    opacity: "0.8",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.9rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    [theme.breakpoints.down("md")]: {
      width: "150px",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
}));

const Search = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <InputBase
      onSubmit={handleSubmit}
      placeholder="Search…"
      onChange={handleChange}
      type="search"
      value={text}
      startAdornment={
        <SearchIcon
          onClick={handleSubmit}
          style={{ cursor: "pointer", color: "#FF0000" }}
          fontSize="small"
        />
      }
      className={classes.searchInput}
    />
  );
};

export default Search;
