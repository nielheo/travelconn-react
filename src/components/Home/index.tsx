import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Button from 'material-ui/Button';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
  public render() {
    return (
    <div>
        <h1>Hello, world!</h1>
        <Button variant={'raised'} color={'primary'}>
          Hello World
        </Button>
    </div>);
  }
}
