// @flow

import React, {Component} from 'react';
import css from './CustomersContainer.css';
import CustomerForm from './CustomerForm';

// sorry you are not dummy, my client
const dummyCustomer = {
  name: 'Dummy Customer',
  website: 'http://dummy.site.fi',
  industry: 'Industrialized Stupidity',
};

class CustomersContainer extends Component {
  render() {
    return (
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.header__headline}>Customer</div>
          <button type="button" className={css.header__button}>
            <i id="icon" /> NEW CUSTOMER
          </button>
          {/* layout for Modal/form is yet to be implemented */}
          <CustomerForm />
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
            {[1, 2, 3, 4, 5, 6, 7].map((id, index) => (
              <CustomerRow key={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const CustomerRow = () => (
  <tr>
    <td className={css.row__name}> {dummyCustomer.name} </td>
    <td className={css.row__website}>
      <a href={dummyCustomer.website}> {dummyCustomer.website} </a>
    </td>
    <td className={css.row__industry}> {dummyCustomer.industry} </td>
  </tr>
);

export default CustomersContainer;
