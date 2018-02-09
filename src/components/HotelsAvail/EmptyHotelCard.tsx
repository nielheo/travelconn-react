import * as React from 'react';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';

import { withStyles, WithStyles } from 'material-ui/styles';

const styles = () => ({
  media: {
    height: 200,
    backgroundColor: '#CCCCCC',
  },
  noLink: {
    textDecoration: 'none'
  },
  hotelName: {
    backgroundColor: '#CCCCCC',
    width: '90%',
    color: '#CCCCCC',
    marginTop: 8,
  }
});

export interface Props {
}

type PropsWithStyles = Props & WithStyles<'media' | 'noLink' | 'hotelName' >;

class HotelCard extends React.Component<PropsWithStyles, {}> {

  _rawMarkup = (content: string) => {
    return { __html: content };
  }
  
  render() {
    let { classes } = this.props;
    return(
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Card >
          <CardMedia
            className={classes.media}
            image={'/imgs/grey.png'}
            title=""
          />
          <CardContent>
            <Typography type="headline" component="h2" className={classes.hotelName}>
              {'.'}
            </Typography>
            <Typography component="p" className={classes.hotelName}>
              {'.'}
            </Typography>
            <Typography component="p" className={classes.hotelName}>
              {'.'}
            </Typography>
            <Typography component="p" className={classes.hotelName}>
              {'.'}
            </Typography>
            <Typography type="headline" component="p" className={classes.hotelName} align={'right'} >
              {'.'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(HotelCard);