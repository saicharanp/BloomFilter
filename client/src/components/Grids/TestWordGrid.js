import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { updateTestWordAction, sendTestWordAction } from '../../actions/action';

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
});

function TestWordGrid(props) {
  const { classes, testWord, updateTestWord, isTested, sendTestWord, isPresent, isTestFailed, status } = props;

  return (
    <Grid item key={2} sm={10} md={6} lg={4}>
        <Card className={classes.card}>
            <CardMedia
            className={classes.cardMedia}
            image="https://i0.wp.com/testautomationresources.com/wp-content/uploads/2018/01/software-testing.jpg?fit=760%2C306&ssl=1&resize=350%2C200"
            title="Test word title"
            />
            <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
                Test
            </Typography>
            <Typography>
                Check if a word is present in the set
                <TextField
                  id="outlined-name"
                  label={status === 'RUNNING' ? 'Test is disabled while indexing' : "Start typing to test word"}
                  className={classes.textField}
                  value={testWord === undefined ? '' : testWord}
                  placeholder="Enter your word"
                  onChange={(e) => updateTestWord(e && e.target && e.target.value)}
                  onKeyPress={(e) => {
                    if(e && e.key === 'Enter' && testWord !== undefined && testWord.length > 0 && !isTested && status !== 'RUNNING') {
                      sendTestWord();
                    }
                  }}
                  margin="normal"
                  style={{width: '-webkit-fill-available'}}
                  variant="outlined" />
            </Typography>
            {showTestStatus(isTestFailed, isPresent, isTested, testWord)}
            </CardContent>
            <CardActions>
              <Button size="large" variant="contained" color="primary" style={{marginLeft: '100px'}} onClick={sendTestWord} 
              disabled={testWord === undefined || testWord.length === 0 || isTested || status === 'RUNNING'}>
                  Test
              </Button>
            </CardActions>
        </Card>
    </Grid>
  );
}

function showTestStatus(isTestFailed, isPresent, isTested, testWord) {
  if(isTestFailed) {
    return (
      <p style={{fontFamily: 'cursive', fontStyle: 'italic', color: 'red', marginLeft: '15px'}}> Failed to test {testWord}, please retry</p>
    );
  }
  if(isTested) {
    return (
      <p style={{fontFamily: 'cursive', fontStyle: 'italic', color: 'green', marginLeft: '15px'}}> {testWord} is {isPresent ? '' : 'NOT'} present in set</p>
    );
  }
}

TestWordGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  testWord: PropTypes.string,
  updateTestWord: PropTypes.func,
  sendTestWord: PropTypes.func,
  isPresent: PropTypes.bool,
  isTestFailed: PropTypes.bool,
  isTested: PropTypes.bool,
  status: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    testWord: state && state.testWord,
    isPresent: state && state.isPresent,
    isTestFailed: state && state.isTestFailed,
    isTested: state && state.isTested,
    status: state && state.status,
    updateTestWord: updateTestWordAction,
    sendTestWord: sendTestWordAction,
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(TestWordGrid));