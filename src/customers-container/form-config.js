// @flow

import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import customersStore from './customers-store';

const plugins = {
  dvr: validatorjs,
};

const fields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'name here',
    type: 'text',
    rules: 'required|string|between:1,25',
  },
  {
    name: 'website',
    label: 'Website',
    type: 'text',
    placeholder: 'website here',
    rules: 'url|string|required',
  },
  {
    name: 'industry',
    label: 'Industry',
    type: 'text',
    placeholder: 'industry here',
    rules: 'string|required',
  },
];

const hooks = {
  onSuccess(form: Object) {
    customersStore.createCustomer(form.values());
  },
};

const form = new MobxReactForm({fields}, {plugins, hooks});

export default form;
