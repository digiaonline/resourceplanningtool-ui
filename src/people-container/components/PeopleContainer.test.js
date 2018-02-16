// @flow

import React from 'react';
import {render} from 'react-dom';
import PeopleContainer from './PeopleContainer';

test('PeopleContainer component renders without crashing', () => {
  const div = document.createElement('div');
  render(<PeopleContainer />, div);
});
