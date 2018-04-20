// @flow

import {observable, action} from 'mobx';
import alertify from 'alertify.js';
import {makeHttpRequest} from '../utils';
import utilityStore from '../utils/utility-store';
import {
  FETCH_CUSTOMERS_QUERY,
  getCreateCustomerQuery,
  getDeleteCustomerQuery,
  getUpdateCustomerQuery,
} from './queries';

class CustomersStore {
  @observable
  customers: [
    {
      id: String,
      name: String,
      url: String,
      logo: String,
      industry: String
    }
  ] = [];

  @action
  fetchCustomers = async () => {
    try {
      const responseData = await makeHttpRequest(FETCH_CUSTOMERS_QUERY);
      this.customers = responseData.listCustomers;
    } catch (error) {
      alertify.error('Cannot fetch customers.');
      throw error;
    }
  };

  @action
  createCustomer = async (customerInfo: Object) => {
    try {
      const CREATE_CUSTOMER_QUERY = getCreateCustomerQuery(
        customerInfo.name,
        customerInfo.url,
        customerInfo.industry,
        customerInfo.logo
      );
      await makeHttpRequest(CREATE_CUSTOMER_QUERY);
      alertify.success('Create customer successfully');
      this.fetchCustomers();
    } catch (error) {
      alertify.error('Cannot create customer.');
      throw error;
    }
    utilityStore.turnOffWaiting();
  };

  @action
  deleteCustomer = async (id: Number) => {
    try {
      const DELETE_CUSTOMER_QUERY = getDeleteCustomerQuery(id);
      const response = await makeHttpRequest(DELETE_CUSTOMER_QUERY);
      if (response.removeCustomer) {
        alertify.success('Customer deleted.');
        this.fetchCustomers();
      }
    } catch (error) {
      alertify.error('Cannot delete customer.');
      throw error;
    }
  };

  @action
  updateCustomer = async (customerInfo: Object) => {
    try {
      const UPDATE_CUSTOMER_QUERY = getUpdateCustomerQuery(
        customerInfo.id,
        customerInfo.name,
        customerInfo.industry,
        customerInfo.url,
        customerInfo.logo
      );
      const response = await makeHttpRequest(UPDATE_CUSTOMER_QUERY);
      if (response.updateCustomer) {
        alertify.success('Update customer successfully');
        this.fetchCustomers();
      }
    } catch (error) {
      alertify.error('Cannot save changes made to customer');
      throw error;
    }
    utilityStore.turnOffWaiting();
  };
}

export default new CustomersStore();
