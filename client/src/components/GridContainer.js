import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AddWordGrid from './Grids/AddWordGrid';
import IndexGrid from './Grids/IndexGrid';
import TestWordGrid from './Grids/TestWordGrid';
import { statusAction } from '../actions/action';
import { connect } from 'react-redux';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

class GridContainer extends Component {

  componentDidMount() {
    this.props.getIndexStatus();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
              <IndexGrid />
              <AddWordGrid />
              <TestWordGrid />
          </Grid>
      </div>
    );
  }
}

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    getIndexStatus: statusAction
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(GridContainer));