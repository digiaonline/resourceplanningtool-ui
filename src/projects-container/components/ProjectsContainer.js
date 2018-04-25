// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Modal from 'react-modal';

import ProjectsStore from '../projects-store';
import PeopleStore from '../../people-container/people-store';
import CustomersStore from '../../customers-container/customers-store';
import Heading from './heading';
import Filters from './filters';
import Projects from './projects';

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
    Modal.setAppElement(document.body);
  }
  render() {
    return (
      <div className={css.projectsApp}>
        <div className={css.contanier}>
          <Heading
            projects={ProjectsStore.Data.length}
            members={PeopleStore.people.length}
            customers={CustomersStore.customers.length}
          />
          <Filters />
          <Projects projects={ProjectsStore.filteredDataList} />
        </div>
      </div>
    );
  }
}

export default ProjectsContainer;
