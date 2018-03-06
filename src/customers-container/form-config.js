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
};

const getForm = (values: Object) => {
  if (!isEmpty(values)) {
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

const isEmpty = object => {
  for (var key in object) {
    if (object.hasOwnProperty(key)) return false;
  }
  return true;
};

export default getForm;
