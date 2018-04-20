// @flow

import validatorjs from 'validatorjs';
import customersStore from '../customers-container/customers-store';
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
  onSuccess: async (form: Object) => {
    utilityStore.turnOnWaiting();
    // get initial values of the form, to see if we are creating or updating modalStyle
    const initialsValue = form.initials();
    if (
      initialsValue.name === '' &&
      initialsValue.url === '' &&
      initialsValue.industry === ''
    ) {
      if (form.values().file) {
        try {
          const logoId = await uploadImage(form.values().file);
          const logoUrl = await getImage(logoId);
          await customersStore.createCustomer(
            Object.assign({}, form.values(), {logo: logoUrl})
          );
        } catch (e) {
          utilityStore.turnOffWaiting();
        }
      } else {
        await customersStore.createCustomer(form.values());
      }
    } else {
      if (form.values().file !== '') {
        try {
          const logoId = await uploadImage(form.values().file);
          const logoUrl = await getImage(logoId);
          await customersStore.updateCustomer(
            Object.assign({}, form.values(), {logo: logoUrl})
          );
        } catch (e) {
          utilityStore.turnOffWaiting();
        }
      } else {
        await customersStore.updateCustomer(form.values());
      }
    }
    utilityStore.toggleCustomerForm();
  },
};
