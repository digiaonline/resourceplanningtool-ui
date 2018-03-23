// @flow

import React, {Component} from 'react';
import css from './CustomersContainer.css';
import CustomerForm from './CustomerForm';
import Table from '../../table/components/Table';
import dummyCustomers from './dummyCustomers';
import {withNavigation} from '../../table/components/withNavigation';
import addIcon from '../../assets/icon_add_b.svg';

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
            <img src={addIcon} alt="" />
            <span>&nbsp; NEW CUSTOMER</span>
          </button>
          <CustomerForm
            isOpened={this.state.formIsOpened}
            toggleForm={this.toggleForm}
            customerInfo={{}}
          />
        </div>
        <TableWithNavigation
          {...this.props}
          columnHeaders={['CUSTOMER', 'WEBSITE', 'INDUSTRY']}
          rowsValue={this.state.customers}
          displayedFields={['name', 'website', 'industry']}
        />
      </div>
    );
  }
}

const TableWithNavigation = withNavigation(Table, '/customers');

export default CustomersContainer;
