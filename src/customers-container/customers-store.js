// @flow

import {observable, action} from 'mobx';
import axios from 'axios';
import dummyCustomers from './components/dummyCustomers';

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
  ] = dummyCustomers;

  @action
  fetchCustomers = async () => {
    try {
      const responseData = await this.makeHttpRequest(this.queryString);
      this.customers = responseData.listCustomers;
    } catch (error) {
      console.log('cant fetch customers', error);
    }
  };

  @action
  createCustomer = async (customerInfo: Object) => {
    try {
      const mutationString = `mutation {
	      createCustomer(name: "${customerInfo.name}", url: "${customerInfo.website}", industry: "${customerInfo.industry}", logo:"shiet logo") {
          id
   		    name
          logo
          industry
          url
	      }
      }`;
      const response = await this.makeHttpRequest(mutationString);
      alert('create customer successfully');
      this.customers.push(response.createCustomer);
    } catch (error) {
      console.log('cant create new customer');
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
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return [];
    }
  };

  queryString = `query {
    listCustomers {
       id
		   name
       logo
       industry
       url
     }
  }`;
}

export default new CustomersStore();
