import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

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
    name: 'customeremail',
    label: 'Customer email',
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
    rules: 'required|date',
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
    options: [
      {value: 'option1', label: 'option1'},
      {value: 'option2', label: 'option2'},
      {value: 'option3', label: 'option3'},
    ],
    rules: 'required',
  },
  {
    name: 'members',
    value: [],
  },
  {
    name: 'usedTechnologies',
    label: 'Technologies',
    options: [
      {value: 'option1', label: 'option1'},
      {value: 'option2', label: 'option2'},
      {value: 'option3', label: 'option3'},
    ],
    rules: 'required',
  },
  {
    name: 'technologies',
    value: [],
  },
  {
    name: 'liveat',
    label: 'Live at',
    placeholder: 'URL',
    rules: 'required|url',
  },
  {
    name: 'githuburl',
    label: 'Github',
    placeholder: 'URL',
    rules: 'required|url',
  },
  {
    name: 'otherLinks',
    label: '',
    placeholder: 'URL',
    rules: 'url',
  },
];

export const hooks = {
  onSuccess(form) {
    console.log('Form Values!', form.values());
  },
  onError(form) {
    console.log('All form errors', form.errors());
  },
};

export default new MobxReactForm({fields}, {plugins, hooks});
