import MobxReactForm from 'mobx-react-form';
import ProjectsStore from './projects-store';
import {normalizeString} from '../utils';
import validatorjs from 'validatorjs';
import alertify from 'alertify.js';
import {uploadImage, getImage} from '../utils/image';
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
    name: 'technologyName',
    label: 'Name',
    placeholder: 'Name',
    rules: 'string',
  },
  {
    name: 'technologyDescription',
    label: 'Description',
    placeholder: 'Description',
    rules: 'string',
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
    utilityStore.turnOnWaiting();
    const updatedValues = Object.assign({}, form.values(), {
      description: normalizeString(form.values().description),
      shortdescription: normalizeString(form.values().shortdescription),
    });
    if (ProjectsStore.formName === 'Create project') {
      //Create project
      try {
        if (updatedValues.file) {
          const pictureId = await uploadImage(updatedValues.file);
          const pictureUrl = await getImage(pictureId);
          ProjectsStore.pictureUrl = pictureUrl;
        }

        await ProjectsStore.createProject(updatedValues);
        const id = ProjectsStore.newProjectId;
        form
          .values()
          .members.map(member => ProjectsStore.addPersonToProject(id, member));
        form
          .values()
          .technologies.map(tech =>
            ProjectsStore.addTechnologiesToProject(id, tech.name)
          );
        ProjectsStore.addProjectToCustomer(id, updatedValues.customer);
        form
          .values()
          .newNews.map(newsId => ProjectsStore.addNewsToProject(id, newsId));
        ProjectsStore.addProjectToCustomer(id, updatedValues.customer);
        utilityStore.turnOffWaiting();
        ProjectsStore.Redirect = true;
        alertify.success('Project Created.');
        ProjectsStore.modalToggle();
      } catch (e) {
        utilityStore.turnOffWaiting();
      }
    } else {
      //Edit project
      try {
        if (!ProjectsStore.pictureUrl) {
          if (updatedValues.file) {
            const pictureId = await uploadImage(form.values().file);
            const pictureUrl = await getImage(pictureId);
            ProjectsStore.pictureUrl = pictureUrl;
          } else {
            ProjectsStore.pictureUrl = '';
          }
        }
        const id = ProjectsStore.projectId;
        const Data = ProjectsStore.projectData;
        ProjectsStore.updateProject(updatedValues);
        //remove old data
        Data.persons.map(person =>
          ProjectsStore.removePersonFromProject(id, person)
        );
        Data.technologies.map(tech =>
          ProjectsStore.removeTechnologyFromProject(id, tech.id)
        );
        Data.news.map(item => ProjectsStore.removeNewsFromProject(id, item.id));
        ProjectsStore.removeProjectFromCustomer(id, Data.customer.id);
        //add new data
        form
          .values()
          .members.map(member => ProjectsStore.addPersonToProject(id, member));
        form
          .values()
          .technologies.map(tech =>
            ProjectsStore.addTechnologiesToProject(id, tech.name)
          );
        form
          .values()
          .newNews.map(newsId => ProjectsStore.addNewsToProject(id, newsId));
        ProjectsStore.addProjectToCustomer(id, updatedValues.customer);
        utilityStore.turnOffWaiting();
        alertify.success('Project Updated.');
        ProjectsStore.modalToggle();
      } catch (e) {
        utilityStore.turnOffWaiting();
      }
    }
  },
  onError(form) {
    console.log('All form errors', form.errors());
  },
};

export default new MobxReactForm({fields}, {plugins, hooks});
