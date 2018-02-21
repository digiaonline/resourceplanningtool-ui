// @flow

import React, {Component} from 'react';
import css from './CustomersContainer.css';
import CustomerForm from './CustomerForm';
import Table from '../../table/components/Table';
import dummyCustomers from './dummyCustomers';

class CustomersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsOpened: false,
      customers: dummyCustomers,
    };
  }
  toggleForm = (customer: ?Customer) => {
    this.setState({
      formIsOpened: !this.state.formIsOpened,
      formData: customer,
    });
  };
  toCustomer = (id: Number) => {
    this.props.history.push(`/customers/${id}`);
  };
  render() {
    return (
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.header__headline}>Customer</div>
          <button
            type="button"
            className={css.header__button}
            onClick={this.toggleForm}
          >
            <i id="icon" /> NEW CUSTOMER
          </button>
          <CustomerForm
            isOpened={this.state.formIsOpened}
            toggleForm={this.toggleForm}
            customerInfo={{}}
          />
        </div>
        <Table
          columnHeaders={['CUSTOMER', 'WEBSITE', 'INDUSTRY']}
          rowsValue={this.state.customers}
          displayedFields={['name', 'website', 'industry']}
        />
      </div>
    );
  }
}

export default CustomersContainer;
