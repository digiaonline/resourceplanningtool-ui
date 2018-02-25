import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

const plugins = {dvr: validatorjs};

const fields = [
  {
    name: 'customerName',
    label: 'Customer name',
    placeholder: 'Customer name',
    type: 'text',
    rules: 'required|string|between:2,25',
  },
  {
    name: 'customerEmail',
    label: 'Customer email',
    placeholder: 'Customer email',
    type: 'text',
    rules: 'required|email|between:5,25',
  },
  {
    name: 'projectName',
    label: 'Project name',
    placeholder: 'projectName',
    type: 'text',
    rules: 'required|string|between:2,25',
  },
  {
    name: 'subProject',
    label: 'Sub-project',
    placeholder: 'Project name',
    type: 'text',
    rules: 'required|string|between:2,25',
  },
  {
    name: 'startTime',
    label: 'Start time (apprx)',
    type: 'month',
    rules: 'required|date',
  },
  {
    name: 'endTime',
    label: 'End time (apprx)',
    type: 'month',
    rules: 'required|date',
  },
  {
    name: 'isOnGoing',
    label: 'Project on-going',
    type: 'checkbox',
    rules: 'required|boolean',
  },
  {
    name: 'shortDescription',
    label: 'One-sentence project description',
    placeholder: 'One-sentence project description',
    type: 'text',
    rules: 'required|string',
  },
  {
    name: 'largDescription',
    label: 'Larger description',
    placeholder: 'Larger description',
    type: 'text',
    rules: 'string',
  },
  {
    name: 'members',
    label: 'person',
    placeholder: 'person',
    type: 'text',
    rules: 'required|string|between:2,25',
  },
  {
    name: 'usedTechnologies',
    label: 'Technologies',
    placeholder: 'Technologies',
    type: 'text',
    rules: 'required|string|between:2,25',
  },
  {
    name: 'linkLive',
    label: 'Live at',
    placeholder: 'URL',
    rules: 'required|url',
  },
  {
    name: 'linkGithub',
    label: 'Github',
    placeholder: 'URL',
    rules: 'required|url',
  },
  {
    name: 'otherLinks',
    label: 'IN THE NEWS',
    placeholder: 'URL',
    rules: 'required|url',
  },
];

const hooks = {
  onSuccess(form) {
    console.log('Form Values!', form.values());
  },
  onError(form) {
    console.log('All form errors', form.errors());
  },
};

export default new MobxReactForm({fields}, {plugins, hooks});
