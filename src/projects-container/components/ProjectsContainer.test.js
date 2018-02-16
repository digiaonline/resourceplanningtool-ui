// @flow

import React from 'react';
import {render} from 'react-dom';
import ProjectsContainer from './ProjectsContainer';

test('ProjectsContainer component renders without crashing', () => {
  const div = document.createElement('div');
  render(<ProjectsContainer />, div);
});
