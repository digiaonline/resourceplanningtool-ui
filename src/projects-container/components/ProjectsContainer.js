// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import form from '../form';
import ProjectsStore from '../store';
import PeopleStore from '../../people-container/people-store';
import CustomersStore from '../../customers-container/customers-store';
import Heading from './heading';
import Filters from './filters';
import Projrcts from './projects';
import css from './ProjectsContainer.css';

@observer
class ProjectsContainer extends Component {
  componentWillMount() {
    ProjectsStore.fetchAllProject();
    ProjectsStore.fetchTechnologies();
    ProjectsStore.resetForm();
    CustomersStore.fetchCustomers();
    PeopleStore.fetchPeople();
  }
  render() {
    return (
      <div className={css.projectsApp}>
        <div className={css.backgroundImg} />
        <div className={css.contanier}>
          <Heading
            projects={ProjectsStore.Data.length}
            members={PeopleStore.people.length}
            customers={CustomersStore.customers.length}
          />
          <Filters />
          <Projrcts projects={ProjectsStore.Data} />
        </div>
      </div>
    );
  }
}

export default ProjectsContainer;
