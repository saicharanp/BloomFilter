import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  }
});

function HeroUnit(props) {
  const { classes } = props;

  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Bloom Filter
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Bloom filter is a probabilistic data structure which tells us whether
          an element is definitely not in the set or may be in the set.
        </Typography>
      </div>
    </div>
  );
}

HeroUnit.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeroUnit);
