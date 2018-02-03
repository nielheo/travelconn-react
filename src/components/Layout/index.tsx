import * as React from 'react';

export interface LayoutProps {
    children?: React.ReactNode;
}

export default class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
            sdfdsfsd
        </div>
        <div className="col-sm-9">
          {this.props.children}
        </div>
      </div>
    </div>);
  } 
}
