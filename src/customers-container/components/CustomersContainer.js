// @flow

import React, {Component} from 'react';
import Modal from 'react-modal';
import css from './CustomersContainer.css';

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
          <h3>Customer</h3>
          <button type="button" className={css.header__button}>
            <span id="logo" /> NEW CUSTOMER
          </button>
          {/* layout for Modal/form is yet to be implemented */}
          <Modal isOpen={false}>
            {' '}
            <h1>KEKEKEKEKE</h1>{' '}
          </Modal>
        </div>
        <table className={css.container__table}>
          <thead>
            <tr>
              <th className={css.row__name}>
                {' '}
                Customer <span id="sort" />{' '}
              </th>
              <th className={css.row__website}> Website </th>
              <th className={css.row__industry}> Industry </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map(id => (
              <tr>
                <td className={css.row__name}> {dummyCustomer.name} </td>
                <td className={css.row__website}> {dummyCustomer.website} </td>
                <td className={css.row__industry}>
                  {' '}
                  {dummyCustomer.industry}{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CustomersContainer;
