import * as React from 'react';

import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Hello from './components/Hello';
import NewBooking from './components/NewBooking';
import HotelsAvail from './components/HotelsAvail';
import HotelRoom from './components/HotelRoom';

import ScrollToTop from './components/ScrollToTop';

const routes = (

  <Layout>
    <ScrollToTop>
      <Route exact path="/" component={Home} />
      <Route exact path="/newbooking" component={NewBooking} />
      <Route exact path="/:locale/hotels/:country/:city/avail" component={HotelsAvail} />
      <Route exact path="/hotels/:country/:city/avail" component={HotelsAvail} />
      <Route exact path="/hotels/:country/:city/:id/rooms" component={HotelRoom} />
      <Route path="/hello" component={Hello} />
    </ScrollToTop>
  </Layout>);

export default routes;
