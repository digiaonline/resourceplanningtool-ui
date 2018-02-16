// @flow

import React from 'react';
import {render} from 'react-dom';
import NotFound from './NotFound';

test('NotFound component renders without crashing', () => {
  const div = document.createElement('div');
  render(<NotFound />, div);
});
