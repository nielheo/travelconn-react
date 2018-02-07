import * as React from 'react';

import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';

import { withStyles, WithStyles } from 'material-ui/styles';

import { hotel } from '../types';
import { ToFinance } from '../functions';

const styles = () => ({
  media: {
    height: 200,
  },
  noLink: {
    textDecoration: 'none'
  },
});

export interface Props {
  hotelDetail: hotel;
  link: string;
  locale: string;
}

type PropsWithStyles = Props & WithStyles<'media' | 'noLink'>;

class HotelCard extends React.Component<PropsWithStyles, {}> {

  _rawMarkup = (content: string) => {
    return { __html: content };
  }
  
  render() {
    let { classes, hotelDetail, link, locale } = this.props;
    return(
      <Grid item lg={3} md={4} sm={6} xs={12} key={hotelDetail.id}>
        <Link 
          to={link} 
          className={classes.noLink} 
          target="_blank"
        >
          <Card >
            <CardMedia
              className={classes.media}
              image={hotelDetail.thumbnail.replace('_s.', '_b.')}
              title={hotelDetail.name}
            />
            <CardContent>
              <Typography type="headline" component="h2" color="primary">
                {hotelDetail.name}
              </Typography>
              <Typography component="p">
                <span dangerouslySetInnerHTML={this._rawMarkup(hotelDetail.shortDesc)} />
              </Typography>
              <Typography type="headline" component="p" color="secondary" align={'right'}>
                {ToFinance( hotelDetail.hotelRooms[0].chargeableRate.currency,
                            hotelDetail.hotelRooms[0].chargeableRate.total, 
                            locale)}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    );
  }
}

export default withStyles(styles)(HotelCard);