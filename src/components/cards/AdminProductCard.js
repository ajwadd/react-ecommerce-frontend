import React from "react";
import laptop from "../../images/laptop.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  image: {
    width: "100%",
    maxWidth: "100%",
  },
  icon: {
    position: "relative",
    top: "50%",
    left: "50%",
    height: "50%",
    transform: "translate(-50%, -50%)",
    width: "10px",
    height: "10px",
    display: "block",
    textAlign: "center",
    lineHeight: "50%",
  },

  buttonAdd: {
    ...theme.typography.estimate,
    borderRadius: 50,
    backgroundColor: theme.palette.common.blue,
    height: 40,
    width: 130,
    fontSize: "1.25rem",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const AdminProductCard = ({ product, handleRemove }) => {
  const classes = useStyles();

  // descructer
  const { title, description, images, slug } = product;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <img
          style={{ height: "150px", objectFit: "cover" }}
          className={classes.image}
          alt="image"
          src={images && images.length ? images[0].url : laptop}
        />
        <CardContent>
          <Grid item container direction="column" justify="center">
            <Typography align="center" gutterBottom variant="h6">
              {`${title}`}
            </Typography>

            <Typography
              align="center"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {`${description && description.substring(0, 40)}...`}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid item container justify="space-between">
          <Grid item container justify="center" xs>
            <Link to={`/admin/product/${slug}`}>
              <IconButton>
                <EditIcon className="text-warning" />
              </IconButton>
            </Link>
          </Grid>
          <Grid item container justify="center" xs>
            <IconButton onClick={() => handleRemove(slug)}>
              <DeleteIcon className="text-danger" />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default AdminProductCard;
