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
  const { classes } = props;

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
                  label="Test Word"
                  className={classes.textField}
                  value=""
                  placeholder="Enter your word"
                  onChange={() => {console.log("hello");}}
                  margin="normal"
                  style={{width: '-webkit-fill-available'}}
                  variant="outlined" />
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="large" variant="contained" color="primary" style={{marginLeft: '100px'}}>
                  Test
              </Button>
            </CardActions>
        </Card>
    </Grid>
  );
}

TestWordGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestWordGrid);