import MobxReactForm from 'mobx-react-form';
import ProjectsStore from './projects-store';
import {uploadImage, getImage} from '../utils/image';
import validatorjs from 'validatorjs';
import utilityStore from '../utils/utility-store';

export const plugins = {dvr: validatorjs};

export const fields = [
  {
    name: 'customer',
    label: 'Customer name',
    placeholder: 'Customer name',
    type: 'text',
    rules: 'required|string|between:2,25',
  },
  {
    name: 'contactemail',
    label: 'Contact email',
    placeholder: 'Customer email',
    type: 'text',
    rules: 'required|email',
  },
  {
    name: 'name',
    label: 'Project name',
    placeholder: 'projectName',
    type: 'text',
    rules: 'required|string|between:2,25',
  },
  {
    name: 'starttime',
    label: 'Start time (apprx)',
    type: 'month',
    rules: 'required|date',
  },
  {
    name: 'endtime',
    label: 'End time (apprx)',
    type: 'month',
    rules: 'date|after:starttime',
  },
  {
    name: 'ongoing',
    label: 'Project on-going',
    type: 'checkbox',
    rules: 'boolean',
  },
  {
    name: 'shortdescription',
    label: 'One-sentence project description',
    placeholder: 'One-sentence project description',
    type: 'text',
    rules: 'required|string',
  },
  {
    name: 'description',
    label: 'Larger description',
    placeholder: 'Larger description',
    type: 'text',
    rules: 'string',
  },
  {
    name: 'member',
    label: 'person',
  },
  {
    name: 'members',
    value: [],
  },
  {
    name: 'usedTechnologies',
    label: 'Technologies',
  },
  {
    name: 'technologies',
    value: [],
  },
  {
    name: 'liveat',
    label: 'Live at',
    placeholder: 'URL',
    rules: 'url',
  },
  {
    name: 'githuburl',
    label: 'Github',
    placeholder: 'URL',
    rules: 'url',
  },
  {
    name: 'newsLink',
    label: '',
    placeholder: 'URL',
    rules: 'url',
  },
  {
    name: 'newsDescription',
    label: '',
    placeholder: 'Description',
    rules: 'string',
    value: '',
  },
  {
    name: 'newNews',
    value: [],
  },
  {
    name: 'picture',
    value: '',
  },
  {
    name: 'file',
    value: '',
  },
];

export const hooks = {
  async onSuccess(form) {
    if (ProjectsStore.formName === 'Create project') {
      //Create project
      if (form.values().file) {
        utilityStore.turnOnWaiting();
        await uploadImage(form.values().file)
          .then(pictureId => getImage(pictureId))
          .then(pictureUrl => (ProjectsStore.pictureUrl = pictureUrl));
      }

      await ProjectsStore.createProject(form.values());
      const id = ProjectsStore.newProjectId;

      form
        .values()
        .members.map(member =>
          ProjectsStore.addPersonToProject(id, member.name)
        );

      form
        .values()
        .technologies.map(tech =>
          ProjectsStore.addTechnologiesToProject(id, tech.name)
        );
      ProjectsStore.addProjectToCustomer(id, form.values().customer);

      form
        .values()
        .newNews.map(newsId => ProjectsStore.addNewsToProject(id, newsId));

      ProjectsStore.addProjectToCustomer(id, form.values().customer);
      utilityStore.turnOffWaiting();
      ProjectsStore.Redirect = true;
      ProjectsStore.modalToggle();
    } else {
      //Edit project
      if (form.values().file) {
        utilityStore.turnOnWaiting();
        await uploadImage(form.values().file)
          .then(pictureId => getImage(pictureId))
          .then(pictureUrl => (ProjectsStore.pictureUrl = pictureUrl));
      }

      const id = ProjectsStore.projectId;
      const Data = ProjectsStore.projectData;
      ProjectsStore.updateProject(form.values());
      //remove old data
      Data.persons.map(person =>
        ProjectsStore.removePersonFromProject(id, person.id)
      );
      Data.technologies.map(tech =>
        ProjectsStore.removeTechnologyFromProject(id, tech.id)
      );
      Data.news.map(item => ProjectsStore.removeNewsFromProject(id, item.id));
      ProjectsStore.removeProjectFromCustomer(id, Data.customer.id);
      //add new data
      form
        .values()
        .members.map(member =>
          ProjectsStore.addPersonToProject(id, member.name)
        );
      form
        .values()
        .technologies.map(tech =>
          ProjectsStore.addTechnologiesToProject(id, tech.name)
        );

      form
        .values()
        .newNews.map(newsId => ProjectsStore.addNewsToProject(id, newsId));
      ProjectsStore.addProjectToCustomer(id, form.values().customer);
      utilityStore.turnOffWaiting();
      ProjectsStore.modalToggle();
    }
  },
  onError(form) {
    console.log('All form errors', form.errors());
  },
};

export default new MobxReactForm({fields}, {plugins, hooks});
