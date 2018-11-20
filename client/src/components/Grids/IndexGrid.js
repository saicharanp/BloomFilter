import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { indexAction } from '../../actions/action';
import { connect } from 'react-redux';

const styles = theme => ({
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
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function IndexGrid(props) {
  const { classes, status } = props;

  return (
    <Grid item key={0} sm={10} md={6} lg={4}>
        <Card className={classes.card}>
            <CardMedia
            className={classes.cardMedia}
            image="https://www.teachingenglish.org.uk/sites/teacheng/files/styles/large/public/images/revisiting_text_iStock_000015756375XSmall%20%281%29_8.jpg"
            title="Index title"
            />
            <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
                Index
            </Typography>
            <Typography>
                <p>Click below to add all the words from <a href="http://codekata.com/data/wordlist.txt" style={{textDecoration: 'none'}}>Codekata wordlist</a> to the set</p>
            </Typography>
            {showIndexStatusText(status)}
            </CardContent>
            <CardActions>
              {showIndexControls(props)}
            </CardActions>
        </Card>
    </Grid>
  );
}

function showIndexControls(props) {
  const { classes, indexWords, status } = props;
  if(status === 'RUNNING') {
    return (
      <CircularProgress style={{marginLeft: '115px'}} className={classes.progress} />
    );
  }
  else {
    return (
    <Button size="large" 
      color="primary" 
      variant="contained" 
      style={{marginLeft: '100px'}} 
      onClick={indexWords} 
      disabled={status === 'INDEXED'}>
        Index
    </Button>
    );
  }
}

function showIndexStatusText(status) {
  if(status === 'INDEXED') {
    return (
      <p style={{fontFamily: 'cursive', fontStyle: 'italic', color: 'green', marginLeft: '15px'}}> Indexing completed successfully</p>
    );
  }
  if(status === 'FAILED') {
    return (
      <p style={{fontFamily: 'cursive', fontStyle: 'italic', color: 'red', marginLeft: '15px'}}> Indexing failed, please restart</p>
    );
  }
}

IndexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  indexWords: PropTypes.func,
  status: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    status: state && state.status,
    indexWords: indexAction
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(IndexGrid));