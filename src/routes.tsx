import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Hello from './components/Hello';
import NewBooking from './components/NewBooking';

const routes = (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route exact path="/newbooking" component={NewBooking} />
    <Route path="/hello" component={Hello} />
  </Layout>);

export default routes;
