// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import ProjectStore from '../store';
import Heading from './heading';
import Filters from './filters';
import Projrcts from './projects';
import css from './ProjectsContainer.css';

@observer
class ProjectsContainer extends Component {
  componentWillMount() {
    ProjectStore.fetchProjects();
  }
  render() {
    return (
      <div className={css.projectsApp}>
        <div className={css.backgroundImg} />
        <div className={css.contanier}>
          <Heading
            projects="122"
            members="22"
            customers="12"
            isOpen={ProjectStore.isOpen}
            openModal={ProjectStore.openModal}
          />
          <Filters />
          <Projrcts Data={ProjectStore.Data} />
        </div>
      </div>
    );
  }
}

export default ProjectsContainer;
