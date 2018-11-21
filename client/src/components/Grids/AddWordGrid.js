import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { updateAddWordAction, sendAddWordAction } from "../../action";

const styles = theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

export function AddWordGrid(props) {
  const { classes, add, updateAddWord, sendAddWord, status } = props;
  const { addWord, isAdded, isAddFailed } = add;

  return (
    <Grid item key={1} sm={10} md={6} lg={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="http://s3.amazonaws.com/static.graphemica.com/glyphs/i500s/000/010/184/original/002B-500x500.png?1275328183"
          title="Add word title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            Add
          </Typography>
          <Typography>
            Add your own word to the set
            <TextField
              id="outlined-name"
              label={
                status === "RUNNING"
                  ? "Add is disabled while indexing"
                  : "Start typing to add word"
              }
              className={classes.textField}
              value={addWord}
              placeholder="Enter your word"
              onChange={e => updateAddWord(e && e.target && e.target.value)}
              onKeyPress={e => {
                if (
                  e &&
                  e.key === "Enter" &&
                  addWord !== undefined &&
                  addWord.length > 0 &&
                  !isAdded &&
                  status !== "RUNNING"
                ) {
                  sendAddWord();
                }
              }}
              disabled={status === "RUNNING"}
              margin="normal"
              style={{ width: "-webkit-fill-available" }}
              variant="outlined"
            />
          </Typography>
          {showAddStatus(isAddFailed, isAdded, addWord)}
        </CardContent>
        <CardActions>
          <Button
            size="large"
            variant="contained"
            color="primary"
            style={{ marginLeft: "100px" }}
            onClick={sendAddWord}
            disabled={
              addWord === undefined ||
              addWord.length === 0 ||
              isAdded ||
              status === "RUNNING"
            }
          >
            Add
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

function showAddStatus(isAddFailed, isAdded, addWord) {
  if (isAdded) {
    return (
      <p
        style={{
          fontFamily: "cursive",
          fontStyle: "italic",
          color: "green",
          marginLeft: "15px"
        }}
      >
        {" "}
        Successfully added {addWord} to set
      </p>
    );
  }
  if (isAddFailed) {
    return (
      <p
        style={{
          fontFamily: "cursive",
          fontStyle: "italic",
          color: "red",
          marginLeft: "15px"
        }}
      >
        {" "}
        Failed to add {addWord}, please retry
      </p>
    );
  }
}

AddWordGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.object,
  sendAddWord: PropTypes.func,
  status: PropTypes.string,
  updateAddWord: PropTypes.func
};

const mapStateToProps = state => {
  return {
    add: state && state.add,
    sendAddWord: sendAddWordAction,
    status: state && state.status,
    updateAddWord: updateAddWordAction
  };
};

export default connect(mapStateToProps)(withStyles(styles)(AddWordGrid));
