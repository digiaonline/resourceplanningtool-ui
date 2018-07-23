// @flow

import React, {createElement} from 'react';
import {render} from 'react-dom';
import alertify from 'alertify.js';
import {AppContainer} from 'react-hot-loader';
import Root from './root/components/Root';
import './index.css';
import './index.global.css';

const renderApp = (component: any) =>
  render(
    <AppContainer>{createElement(component)}</AppContainer>,
    document.getElementById('root')
  );

renderApp(Root);

// customized alertify for notification
alertify.delay(4000);
alertify.logPosition('bottom right');

if (module.hot) {
  // $FlowFixMe
  module.hot.accept('./root/components/Root', () => {
    const nextRoot = require('./root/components/Root').default;
    renderApp(nextRoot);
  });
}
