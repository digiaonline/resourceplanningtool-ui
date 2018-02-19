// @flow

import React, {Component} from 'react';
import css from './CustomersContainer.css';
import CustomerForm from './CustomerForm';
import CustomerRow from './CustomerRow';
import dummyCustomers from './dummyCustomers';

type Customer = {
  name: string,
  website: string,
  industry: string
};

class CustomersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsOpened: false,
      customers: dummyCustomers,
      formData: {},
    };
  }
  toggleForm = (customer: ?Customer) => {
    this.setState({
      formIsOpened: !this.state.formIsOpened,
      formData: customer,
    });
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
            customerInfo={this.state.formData}
          />
        </div>
        <table className={css.container__table}>
          <thead>
            <tr>
              <th className={css.row__name}>
                {' '}
                CUSTOMER <span id="sort" />{' '}
              </th>
              <th className={css.row__website}> WEBSITE </th>
              <th className={css.row__industry}> INDUSTRY </th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map((id, index) => (
              <CustomerRow
                key={index}
                customerInfo={this.state.customers[index]}
                toggleForm={this.toggleForm}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CustomersContainer;
