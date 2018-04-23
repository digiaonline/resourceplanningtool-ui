//@flow

import {observable, action, computed} from 'mobx';

import form from './form-config';
import {makeHttpRequest} from '../utils';
import {
  getDeleteProjectQuery,
  getCreateProjectQuery,
  getAddPersonToProjectQuery,
  getAddTechnologiesToProjectQuery,
  getAddProjectToCustomerQuery,
  getUpdateProjectQuery,
  getRemovePersonfromProjectQuery,
  getRemoveTechnologiesFromProjectQuery,
  getRemoveProjectFromCustomerQuery,
  getCreateNewsQuery,
  getCreateTechnologyQuery,
  getAddNewsToProjectQuery,
  getRemoveNewsFromProjectQuery,
  getProjectQuery,
  ALL_PROJECTS_QUERY,
  TECHNOLOGIES_QUERY,
  ALL_NEWS_QUERY,
} from './queries';

class ProjectsStore {
  @observable Data = [];
  @observable isOpen: boolean = false;
  @observable projectId: ?number = null;
  @observable newProjectId: ?number = null;
  @observable newsID: ?number = null;
  @observable allNews = [];
  @observable formName: ?string = null;
  @observable projectData = {};
  @observable technologiesList = [];
  @observable technologyFilter = '';
  @observable statusFilter = '';
  @observable Redirect = false;
  @observable pictureUrl = '';

  @computed
  get filteredDataList(): Array<Object> {
    return this.Data
      .filter(project => {
        const technologies = project.technologies.map(tech => tech.name);
        return (
          !this.technologyFilter || technologies.includes(this.technologyFilter)
        );
      })
      .filter(project => {
        const isEmpty = this.statusFilter === '';
        let FILTER;
        if (this.statusFilter === 'true') {
          FILTER = true;
        } else if (this.statusFilter === 'false') {
          FILTER = false;
        }
        return isEmpty || project.ongoing === FILTER;
      });
  }

  @action
  modalToggle = () => {
    this.isOpen = !this.isOpen;
  };

  @action
  fetchAllProject = async () => {
    const query: string = ALL_PROJECTS_QUERY;
    try {
      const response: Object = await makeHttpRequest(query);
      this.Data = response.listProjects;
    } catch (error) {
      return [];
    }
  };

  @action
  fetchProject = async (id: ?number) => {
    const query: string = getProjectQuery(id);
    try {
      const response: Object = await makeHttpRequest(query);
      this.projectData = response.project || {};
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('error', error);
      return [];
    }
  };

  fetchTechnologies = async () => {
    const query: string = TECHNOLOGIES_QUERY;
    try {
      const response: Object = await makeHttpRequest(query);
      response.listTechnologies.sort(function(a, b) {
        return a.name.toUpperCase() > b.name.toUpperCase()
          ? 1
          : b.name.toUpperCase() > a.name.toUpperCase() ? -1 : 0;
      });
      this.technologiesList = response.listTechnologies;
    } catch (error) {
      console.warn('error', error);
      return [];
    }
  };

  @action
  createProject = async (progectInfo: Object) => {
    const query: string = getCreateProjectQuery(
      this.pictureUrl,
      new Date(progectInfo.starttime).getTime() / 1000.0,
      progectInfo.endtime ? new Date(progectInfo.endtime).getTime() / 1000 : 0,
      progectInfo.ongoing,
      progectInfo.liveat,
      progectInfo.githuburl,
      progectInfo.name,
      progectInfo.shortdescription,
      progectInfo.description,
      progectInfo.contactemail
    );
    try {
      const response: Object = await makeHttpRequest(query);
      this.newProjectId = response.createProject.id;
      this.fetchAllProject();
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  updateProject = async (projectInfo: Object) => {
    const query: string = getUpdateProjectQuery(
      this.projectId,
      this.pictureUrl,
      new Date(projectInfo.starttime).getTime() / 1000.0,
      projectInfo.endtime ? new Date(projectInfo.endtime).getTime() / 1000 : 0,
      projectInfo.ongoing,
      projectInfo.liveat,
      projectInfo.githuburl,
      projectInfo.name,
      projectInfo.shortdescription,
      projectInfo.description,
      projectInfo.contactemail
    );
    try {
      await makeHttpRequest(query);
      this.fetchProject(this.projectId);
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  addPersonToProject = async (project_id: number, person_id: number) => {
    const query: string = getAddPersonToProjectQuery(project_id, person_id);
    try {
      await makeHttpRequest(query);
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  removePersonFromProject = async (project_id: number, person_id: number) => {
    const query: string = getRemovePersonfromProjectQuery(
      project_id,
      person_id
    );
    try {
      await makeHttpRequest(query);
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  addTechnologiesToProject = async (
    project_id: number,
    technology_id: number
  ) => {
    const query: string = getAddTechnologiesToProjectQuery(
      project_id,
      technology_id
    );
    try {
      await makeHttpRequest(query);
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  removeTechnologyFromProject = async (
    project_id: number,
    technology_id: number
  ) => {
    const query: string = getRemoveTechnologiesFromProjectQuery(
      project_id,
      technology_id
    );
    try {
      await makeHttpRequest(query);
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  addProjectToCustomer = async (project_id: number, customer_id: number) => {
    const query: string = getAddProjectToCustomerQuery(project_id, customer_id);
    try {
      await makeHttpRequest(query);
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  removeProjectFromCustomer = async (
    project_id: number,
    customer_id: number
  ) => {
    const query: string = getRemoveProjectFromCustomerQuery(
      project_id,
      customer_id
    );
    try {
      await makeHttpRequest(query);
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  deleteProject = async (id: number) => {
    const query: string = getDeleteProjectQuery(id);
    try {
      makeHttpRequest(query);
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  createNews = async (url: string, description: string) => {
    const query: string = getCreateNewsQuery(url, description);
    try {
      const response: Object = await makeHttpRequest(query);
      this.newsID = response.createNews.id;
      this.fetchNews();
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  createTechnology = async (name: string, description: string) => {
    const query: string = getCreateTechnologyQuery(name, description);
    try {
      await makeHttpRequest(query);
      this.fetchTechnologies();
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  fetchNews = async () => {
    try {
      const response: Object = await makeHttpRequest(ALL_NEWS_QUERY);
      this.allNews = response.listNews;
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  addNewsToProject = async (project_id: number, news_id: number) => {
    const query: string = getAddNewsToProjectQuery(project_id, news_id);
    try {
      await makeHttpRequest(query);
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  removeNewsFromProject = async (project_id: number, news_id: number) => {
    const query: string = getRemoveNewsFromProjectQuery(project_id, news_id);
    try {
      await makeHttpRequest(query);
    } catch (error) {
      console.warn('error', error);
    }
  };

  @action
  addToMembers = (select: Object) => {
    if (!form.$('members').value.includes(select)) {
      const values: Array<Object> = form.$('members').value.concat(select);
      form.$('members').set('value', values);
    }
  };

  @action
  removeAllMembers = () => {
    form.$('members').set('value', []);
  };

  @action
  removeAllNews = () => {
    form.$('newNews').set('value', []);
  };

  @action
  removeMember = (member: Object) => {
    const Selected: Array<Object> = form
      .$('members')
      .value.filter(item => item !== member);
    form.$('members').set('value', Selected);
  };

  @action
  removeNews = (news: Object) => {
    const Selected: Object = form
      .$('newNews')
      .value.filter(item => item !== news);
    form.$('newNews').set('value', Selected);
  };

  @action
  addToTechnologies = (select: Object) => {
    const allTechnologies: Array<Object> = form
      .$('technologies')
      .value.map(item => item.name);
    if (!allTechnologies.includes(select)) {
      const values: Array<Object> = form
        .$('technologies')
        .value.concat({name: select});
      form.$('technologies').set('value', values);
    }
  };

  @action
  removeTechnologie = (tech: Object) => {
    const Selected: Array<Object> = form
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
    form.$('picture').set('value', '');
    form.$('file').set('value', '');
    form.$('newsLink').set('value', '');
    form.$('newsDescription').set('value', '');
    form.$('newNews').set('value', []);
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
    const technologies: Array<{name: number}> = Data.technologies.map(item => {
      return {name: item.id};
    });
    const members: Array<{name: number}> = Data.persons.map(item => {
      return {name: item.id};
    });
    const news: Array<number> = Data.news.map(item => item.id);
    form.$('name').set('value', Data.name);
    form.$('contactemail').set('value', Data.contactemail);
    form.$('customer').set('value', Data.customer.id);
    form.$('starttime').set('value', this.convertDate(Data.starttime));
    form.$('endtime').set('value', this.convertDate(Data.endtime));
    form.$('picture').set('value', `http://${Data.picture}`);
    form.$('file').set('value', '');
    form.$('ongoing').set('value', Data.ongoing);
    form.$('description').set('value', Data.description);
    form.$('shortdescription').set('value', Data.shortdescription);
    form.$('technologies').set('value', technologies);
    form.$('members').set('value', members);
    form.$('newNews').set('value', news);
    form.$('liveat').set('value', Data.liveat);
    form.$('githuburl').set('value', Data.githuburl);
  };

  convertDate(date: number): string {
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

  @action
  form_name = (name: string) => {
    this.formName = name;
  };
}

export default new ProjectsStore();
