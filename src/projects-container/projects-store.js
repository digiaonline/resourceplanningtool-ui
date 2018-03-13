//@flow

import {observable, action} from 'mobx';
import axios from 'axios';
import form from './form-config';
import {
  getDeleteProjectQuery,
  getCreateProjectQuery,
  getAddPersonToProject,
  getAddTechnologiesToProject,
  getAddProjectToCustomer,
} from './queries';

class ProjectsStore {
  @observable Data = [];
  @observable isOpen: Boolean = false;
  @observable projectId = null;
  @observable newProjectId = null;
  @observable projectData = [];
  @observable technologiesList = [];

  @action
  modalToggle = () => {
    this.isOpen = !this.isOpen;
  };

  @action
  fetchAllProject = async () => {
    const URL = 'http://10.5.0.177:3002/skillz';
    try {
      const response = await axios.post(URL, this.allProjectQuery, {
        headers: {
          'Content-Type': 'application/graphql',
        },
      });
      this.Data = response.data.data.listProjects;
    } catch (error) {
      return [];
    }
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
          'Content-Type': 'application/graphql',
        },
      });
      this.projectData = response.data.data.project;
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('error', error);
      return [];
    }
  };

  fetchTechnologies = async () => {
    const URL = 'http://10.5.0.177:3002/skillz';
    try {
      const response = await axios.post(URL, this.technologiesQuery, {
        headers: {
          'Content-Type': 'application/graphql',
        },
      });
      this.technologiesList = response.data.data.listTechnologies;
    } catch (error) {
      return [];
    }
  };

  @action
  createProject = async (progectInfo: object) => {
    const query = getCreateProjectQuery(
      '',
      new Date(progectInfo.starttime).getTime() / 1000.0,
      new Date(progectInfo.endtime).getTime() / 1000.0,
      progectInfo.ongoing,
      progectInfo.liveat,
      progectInfo.githuburl,
      progectInfo.name,
      progectInfo.shortdescription,
      progectInfo.description,
      progectInfo.contactemail
    );
    try {
      const response = await this.makeHttpRequest(query);
      this.newProjectId = response.createProject.id;
    } catch (error) {
      console.log('cant create person', error);
    }
  };

  @action
  addPersonToProject = async (projectId, personId) => {
    const query = getAddPersonToProject(projectId, personId);
    try {
      const response = await this.makeHttpRequest(query);
    } catch (error) {
      console.log('error', error);
    }
  };

  @action
  addTechnologiesToProject = async (projectId, technologyid) => {
    const query = getAddTechnologiesToProject(projectId, technologyid);
    try {
      const response = await this.makeHttpRequest(query);
    } catch (error) {
      console.log('error', error);
    }
  };

  @action
  addProjectToCustomer = async (projectId, customerId) => {
    console.log('projectId', projectId, 'customer', customerId);
    const query = getAddProjectToCustomer(projectId, customerId);
    try {
      const response = await this.makeHttpRequest(query);
    } catch (error) {
      console.log('error', error);
    }
  };

  @action
  deleteProject = async id => {
    const URL = 'http://10.5.0.177:3002/skillz';
    const query = getDeleteProjectQuery(id);
    try {
      const response = await this.makeHttpRequest(query);
      console.log('Deleting Complete');
    } catch (error) {
      console.log('error', error);
    }
  };

  @action
  makeHttpRequest = async (queryString: String) => {
    try {
      const response = await axios.post(
        'http://10.5.0.177:3002/skillz',
        queryString,
        {
          headers: {
            'Content-Type': 'application/graphql',
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
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

  @action
  resetForm = () => {
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
  };

  @action
  updateForm = () => {
    const Data = this.projectData;
    const technologies = Data.technologies.map(item => {
      return {name: item.id};
    });
    const members = Data.persons.map(item => {
      return {name: item.id};
    });
    form.$('name').set('value', Data.name);
    form.$('contactemail').set('value', Data.contactemail);
    form.$('customer').set('value', Data.customer.id);
    form.$('starttime').set('value', this.convertDate(Data.starttime));
    form.$('endtime').set('value', this.convertDate(Data.endtime));
    form.$('ongoing').set('value', Data.ongoing);
    form.$('description').set('value', Data.description);
    form.$('shortdescription').set('value', Data.shortdescription);
    form.$('technologies').set('value', technologies);
    form.$('members').set('value', members);
    form.$('liveat').set('value', Data.liveat);
    form.$('githuburl').set('value', Data.githuburl);
  };

  convertDate(date) {
    if (date) {
      const time = new Date(date * 1000);
      const month =
        time.getMonth() + 1 > 9
          ? time.getMonth() + 1
          : `0${time.getMonth() + 1}`;
      const year = time.getFullYear();
      return `${year}-${month}`;
    }
    return '';
  }

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
      customer {id}
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
}

export default new ProjectsStore();
