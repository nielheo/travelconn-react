import * as React from 'react';
import * as Scroll from 'react-scroll';
import { withRouter, RouteComponentProps } from 'react-router';

export interface LayoutProps {
  children?: React.ReactNode;
}

type PropsWithStyles = LayoutProps 
  & RouteComponentProps<LayoutProps>;

class ScrollToTop extends React.Component<PropsWithStyles, {}> {
  componentDidUpdate(prevProps: PropsWithStyles) {
    if (this.props.location !== prevProps.location) {
      let scroll = Scroll.animateScroll;
      scroll.scrollToTop({
        duration: 1500,
        delay: 100,
        smooth: true
      });
    //  window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);