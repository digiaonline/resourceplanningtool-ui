//@flow

import {observable, action} from 'mobx';
import axios from 'axios';
import form from './form';

class ProjectsStore {
  @observable Data = [];
  @observable isOpen: Boolean = false;
  @observable projectId = null;
  @observable projectData = [];
  @observable technologiesList = [];

  @action
  modalToggle = () => {
    this.isOpen = !this.isOpen;
  };

  @action
  fetchProject = async id => {
    const URL = 'http://10.5.0.177:3002/skillz';
    this.projectId = id;
    const query = ` query { project (id: ${this.projectId}) ${this
      .projectQuery}`;
    try {
      const response = await axios.post(URL, query, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.projectData = response.data.data.project;
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('error', error);
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
      // TODO: proper notification to be implemented
      console.warn('cant fetch projects', error);
      return [];
    }
  };

  fetchTechnologies = async () => {
    const URL = 'http://10.5.0.177:3002/skillz';
    try {
      const response = await axios.post(URL, this.technologiesQuery, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.technologiesList = response.data.data.listTechnologies;
    } catch (error) {
      return [];
    }
  };

  @action
  addToMembers = select => {
    if (!form.$('members').value.includes(select)) {
      const values = form.$('members').value.concat(select);
      form.$('members').set('value', values);
    }
  };

  @action
  removeAllMembers = () => {
    form.$('members').set('value', []);
  };

  @action
  removeMember = member => {
    const Selected = form.$('members').value.filter(item => item !== member);
    form.$('members').set('value', Selected);
  };

  @action
  addToTechnologies = select => {
    const allTechnologies = form.$('technologies').value.map(item => item.name);
    console.log(allTechnologies);
    if (!allTechnologies.includes(select)) {
      const values = form.$('technologies').value.concat({name: select});
      form.$('technologies').set('value', values);
    }
  };

  @action
  removeTechnologie = tech => {
    const Selected = form
      .$('technologies')
      .value.filter(item => item.name !== tech);
    form.$('technologies').set('value', Selected);
  };

  projectsQuery = `query {
listProjects {
  id
  name
  description
  githuburl
  liveat
  technologies {
    id
    name
  }
}
}`;

  projectQuery = `{
  id
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
  technologies {id, name}
  persons { name }
}
}`;

  technologiesQuery = `query {
listTechnologies {
id
name
}
}`;
}

export default new ProjectsStore();
