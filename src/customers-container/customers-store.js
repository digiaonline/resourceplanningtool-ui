// @flow

import {observable, action} from 'mobx';
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
      // TODO: proper notification to be implemented
      console.warn('cant fetch customers', error);
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
      // TODO: proper notification to be implemented
      console.info('create customer successfully');
      this.fetchCustomers();
    } catch (error) {
      // TODO: proper notification to be implemented
      console.info('cant create new customer');
    }
    utilityStore.turnOffWaiting();
  };

  @action
  deleteCustomer = async (id: Number) => {
    try {
      const DELETE_CUSTOMER_QUERY = getDeleteCustomerQuery(id);
      const response = await makeHttpRequest(DELETE_CUSTOMER_QUERY);
      if (response.removeCustomer) {
        this.fetchCustomers();
      }
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant delete customer');
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
        // TODO: proper notification to be implemented
        console.info('update customer successfully');
        this.fetchCustomers();
      }
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant save customer');
    }
    utilityStore.turnOffWaiting();
  };
}

export default new CustomersStore();
