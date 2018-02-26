//@flow

import {observable, action} from 'mobx';
import axios from 'axios';

class ProjectsStore {
  @observable Data = [];
  @observable isOpen: Boolean = false;

  @action
  fetchProjects = async () => {
    try {
      const response = await axios.post(
        'http://10.5.0.177:3002/skillz',
        this.projectsQuery,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data.data.listProjects);
      this.Data = response.data.data.listProjects;
    } catch (error) {
      return [];
    }
  };

  projectsQuery = `query {
  listProjects {
    id
    name
    description
    githuburl
    liveat
    technologies {
      name
    }
  }
}`;

  @action
  openModal = () => {
    this.isOpen = !this.isOpen;
  };
}

export default new ProjectsStore();
