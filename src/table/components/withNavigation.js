// @flow

import React from 'react';

// function for higher order component table, adding navigation
// arguments:
// - wrapped components
// - url the wrapped component leads to
// - array of objects for rows' values
export function withNavigation(WrappedComponent: Function, url: String) {
  return class extends React.Component {
    navigate = (id: Number) => {
      this.props.history.push(`${url}/${id}`);
    };
    render() {
      return <WrappedComponent {...this.props} navigate={this.navigate} />;
    }
  };
}
