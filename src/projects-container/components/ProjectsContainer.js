// @flow

import React, {Component} from 'react';
import Heading from './heading';
import Filters from './filters';
import Projrcts from './projects';
import css from './ProjectsContainer.css';
import Data from '../../MOCK_DATA.json';

class ProjectsContainer extends Component {
  render() {
    return (
      <div className={css.projectsApp}>
        <div className={css.backgroundImg} />
        <div className={css.contanier}>
          <Heading projects="122" members="22" customers="12" />
          <Filters />
          <Projrcts Data={Data} />
        </div>
      </div>
    );
  }
}

export default ProjectsContainer;
