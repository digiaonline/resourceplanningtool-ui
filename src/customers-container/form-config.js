// @flow

import validatorjs from 'validatorjs';
import customersStore from './customers-store';
import {uploadImage, getImage} from '../utils/image';
import utilityStore from '../utils/utility-store';

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
  {
    name: 'logo',
    label: 'logo',
  },
  {
    name: 'file',
    label: 'file',
  },
];

export const hooks = {
  onSuccess(form: Object) {
    utilityStore.turnOnWaiting();
    // get initial values of the form, to see if we are creating or updating modalStyle
    const initialsValue = form.initials();
    if (
      initialsValue.name === '' &&
      initialsValue.url === '' &&
      initialsValue.industry === ''
    ) {
      if (form.values().file) {
        uploadImage(form.values().file)
          .then(logoId => getImage(logoId))
          .then(logoUrl => {
            customersStore.createCustomer(
              Object.assign({}, form.values(), {logo: logoUrl})
            );
          });
      } else {
        customersStore.createCustomer(form.values());
      }
    } else {
      if (form.values().file !== '') {
        uploadImage(form.values().file)
          .then(logoId => getImage(logoId))
          .then(logoUrl => {
            customersStore.updateCustomer(
              Object.assign({}, form.values(), {logo: logoUrl})
            );
          });
      } else {
        customersStore.updateCustomer(form.values());
      }
    }
  },
};
