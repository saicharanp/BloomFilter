import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    }
});

function Footer(props) {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
            Saicharan Poduri
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Implemented as a training exercise
        </Typography>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);