// @flow

import React from 'react';
import {render} from 'react-dom';
import CustomersContainer from './CustomersContainer';

test('CustomersContainer component renders without crashing', () => {
  const div = document.createElement('div');
  render(<CustomersContainer />, div);
});
