// @flow

import React from 'react';
import css from './NotFound.css';

const NotFound = props => (
  <div className={css.container}>
    <h1 className={css.container__message}>
      {props.location.state ? (
        props.location.state.message || 'Some errors happened'
      ) : (
        '404 Not Found'
      )}
    </h1>
  </div>
);

export default NotFound;
