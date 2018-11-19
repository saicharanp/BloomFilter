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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

function AddWordGrid(props) {
  const { classes } = props;

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
                  label="Add Word"
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
                Add
            </Button>
            </CardActions>
        </Card>
    </Grid>
  );
}

AddWordGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddWordGrid);