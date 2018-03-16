// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import ProjectsStore from '../projects-store';
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
    ProjectsStore.fetchNews();
    CustomersStore.fetchCustomers();
    PeopleStore.fetchPeople();
    ProjectsStore.form_name('Create project');
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
          <Projrcts projects={ProjectsStore.filteredDataList} />
        </div>
      </div>
    );
  }
}

export default ProjectsContainer;
