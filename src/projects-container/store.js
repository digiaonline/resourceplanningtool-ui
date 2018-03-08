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
  @observable personsList = [];

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
      console.log('error', error);
      return [];
    }
  };

  @action
  fetchAllProject = async () => {
    const URL = 'http://10.5.0.177:3002/skillz';
    try {
      const response = await axios.post(URL, this.allProjectQuery, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.Data = response.data.data.listProjects;
    } catch (error) {
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

  fetchPersons = async () => {
    const URL = 'http://10.5.0.177:3002/skillz';
    try {
      const response = await axios.post(URL, this.personsQuery, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.personsList = response.data.data.listPersons;
    } catch (error) {
      return [];
    }
  };

  @action
  addToMembers = select => {
    const allMembers = form.$('members').value.map(item => item.name);
    if (!allMembers.includes(select)) {
      const values = form.$('members').value.concat({name: select});
      form.$('members').set('value', values);
    }
  };

  @action
  removeAllMembers = () => {
    form.$('members').set('value', []);
  };

  @action
  removeMember = member => {
    const Selected = form
      .$('members')
      .value.filter(item => item.name !== member);
    form.$('members').set('value', Selected);
  };

  @action
  addToTechnologies = select => {
    const allTechnologies = form.$('technologies').value.map(item => item.name);
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

  allProjectQuery = `query {
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
      technologies {id}
      persons {id}
    }
  }`;

  technologiesQuery = `query {
    listTechnologies {
      id
      name
    }
  }`;

  personsQuery = `query {
    listPersons {
      id
      name
    }
  }`;
}

export default new ProjectsStore();
