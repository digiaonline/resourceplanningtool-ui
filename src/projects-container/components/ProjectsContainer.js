// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import form from '../../projects-container/form';
import ProjectStore from '../store';
import Heading from './heading';
import Filters from './filters';
import Projrcts from './projects';
import css from './ProjectsContainer.css';

@observer
class ProjectsContainer extends Component {
  componentWillMount() {
    ProjectStore.fetchAllProject();
    ProjectStore.fetchTechnologies();
    ProjectStore.fetchPersons();
    form.$('name').set('value', '');
    form.$('contactemail').set('value', '');
    form.$('customer').set('value', '');
    form.$('starttime').set('value', '');
    form.$('endtime').set('value', '');
    form.$('ongoing').set('value', false);
    form.$('description').set('value', '');
    form.$('shortdescription').set('value', '');
    form.$('technologies').set('value', []);
    form.$('members').set('value', []);
    form.$('liveat').set('value', '');
    form.$('githuburl').set('value', '');
  }
  render() {
    return (
      <div className={css.projectsApp}>
        <div className={css.backgroundImg} />
        <div className={css.contanier}>
          <Heading projects="122" members="22" customers="12" />
          <Filters />
          <Projrcts Data={ProjectStore.Data} />
        </div>
      </div>
    );
  }
}

export default ProjectsContainer;
