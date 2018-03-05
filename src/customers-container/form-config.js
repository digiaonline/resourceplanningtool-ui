// @flow

import validatorjs from 'validatorjs';
import Form from 'mobx-react-form';
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
    name: 'url',
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
  onChange(field) {
    console.log(field);
  },
};

const getForm = (values: Object) => {
  if (values.toString() !== '{}') {
    const fields = updateFieldsWithValues(values);
    return new Form({fields}, {plugins, hooks});
  } else {
    return new Form({fields}, {plugins, hooks});
  }
};

const updateFieldsWithValues = (values: Object) => {
  let fieldsWithValues = fields.map(field => {
    return Object.assign({}, field, {
      value: values[field.name],
    });
  });
  return fieldsWithValues;
};

export default getForm;
