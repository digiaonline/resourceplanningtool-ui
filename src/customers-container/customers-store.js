// @flow

import {observable, action} from 'mobx';
import axios from 'axios';
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
      const responseData = await this.makeHttpRequest(FETCH_CUSTOMERS_QUERY);
      this.customers = responseData.listCustomers;
    } catch (error) {
      console.log('cant fetch customers', error);
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
      console.log(CREATE_CUSTOMER_QUERY);
      await this.makeHttpRequest(CREATE_CUSTOMER_QUERY);
      alert('create customer successfully');
      this.fetchCustomers();
    } catch (error) {
      console.log('cant create new customer');
    }
  };

  @action
  deleteCustomer = async (id: Number) => {
    try {
      const DELETE_CUSTOMER_QUERY = getDeleteCustomerQuery(id);
      const response = await this.makeHttpRequest(DELETE_CUSTOMER_QUERY);
      if (response.removeCustomer) {
        this.fetchCustomers();
      }
    } catch (error) {
      console.log('cant delete customer');
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
      const response = await this.makeHttpRequest(UPDATE_CUSTOMER_QUERY);
      if (response.updateCustomer) {
        alert('update customer successfully');
        this.fetchCustomers();
      }
    } catch (error) {
      console.log('cant save customer');
    }
  };

  @action
  makeHttpRequest = async (queryString: String) => {
    try {
      const response = await axios.post(
        'http://10.5.0.177:3002/skillz',
        queryString,
        {
          headers: {
            'Content-Type': 'application/graphql',
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new CustomersStore();
