import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';

const routes = (
  <Layout>
    <Route exact={true} path="'/" component={Home} />
  </Layout>);

export default routes;
