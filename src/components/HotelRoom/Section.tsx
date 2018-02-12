import * as React from 'react';
import Grid from 'material-ui/Grid';

import Typography from 'material-ui/Typography';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui/styles';

interface Props {
  header: string;
}

type ClassNames =
  | 'section'
  | 'title';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  title: {
    color: theme.palette.primary,
  },
  section: {
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#CCC',
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
});

type PropsWithStyles = Props & WithStyles<ClassNames>;

class Section extends React.Component<PropsWithStyles, {}> {
  _rawMarkup = (content: string) => {
    return { __html: content };
  }

  render() {
    let {classes} = this.props;
    return(
      <Grid container className={classes.section} spacing={16}>
        <Grid item xs={12} sm={3} md={2} style={{paddingTop: 20}}>
          <Typography variant="title" color="secondary" gutterBottom style={{lineHeight: '1.4em'}}>
            {this.props.header}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9} md={10}>
          <Typography gutterBottom>
            {this.props.children}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Section);
