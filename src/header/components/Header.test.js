// @flow

import React from 'react';
import {render} from 'react-dom';
import Header from './Header';

test('Header component renders without crashing', () => {
  const div = document.createElement('div');
  render(<Header />, div);
});
