//@flow

import {observable, action} from 'mobx';
import axios from 'axios';

class ProjectsStore {
  @observable Data = [];
  @observable isOpen: Boolean = false;
  @observable projectId = null;
  @observable projectData = [];

  @action
  modalToggle = () => {
    this.isOpen = !this.isOpen;
  };

  @action
  fetchProject = async id => {
    this.projectId = id;
    const query = ` query { project (id: ${this.projectId}) ${this
      .projectQuery}`;
    const URL = 'http://10.5.0.177:3002/skillz';
    try {
      const response = await axios.post(URL, query, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.projectData = response.data.data.project;
    } catch (error) {
      console.log('error', error);
      return [];
    }
  };

  @action
  fetchProjects = async () => {
    const URL = 'http://10.5.0.177:3002/skillz';
    try {
      const response = await axios.post(URL, this.projectsQuery, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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

  projectQuery = `{
		name
    starttime
    endtime
    ongoing
    liveat
    githuburl
    shortdescription
    description
    contactemail
    customer { name }
	}
}`;
}

export default new ProjectsStore();
