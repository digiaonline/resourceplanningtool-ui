// @flow

import validatorjs from 'validatorjs';
import customersStore from './customers-store';

export const plugins = {
  dvr: validatorjs,
};

export const fields = [
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
  {
    name: 'id',
    label: 'id',
  },
];

export const hooks = {
  onSuccess(form: Object) {
    // get initial values of the form, to see if we are creating or updating modalStyle
    const initialsValue = form.initials();
    if (initialsValue.name && initialsValue.url && initialsValue.industry) {
      customersStore.createCustomer(form.values());
    } else {
      customersStore.updateCustomer(form.values());
    }
  },
};
