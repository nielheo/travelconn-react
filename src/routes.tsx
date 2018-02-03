import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Hello from './components/Hello';

const routes = (
  <Layout>
    <Route exact={true} path="/" component={Home} />
    <Route path="/hello" component={Hello} />
  </Layout>);

export default routes;
