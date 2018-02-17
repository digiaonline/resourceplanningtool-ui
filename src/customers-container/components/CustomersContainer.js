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
      <div>
        <div className={css.containerHeader}>
          <h3>Customer</h3>
          <button type="button">
            <span id="logo" /> NEW CUSTOMER
          </button>
          {/* layout for Modal/form is yet to be implemented */}
          <Modal isOpen={false}>
            {' '}
            <h1>KEKEKEKEKE</h1>{' '}
          </Modal>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                {' '}
                Customer <span id="sort" />{' '}
              </th>
              <th> Website </th>
              <th> Industry </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map(id => (
              <tr>
                <td> {dummyCustomer.name} </td>
                <td> {dummyCustomer.website} </td>
                <td> {dummyCustomer.industry} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CustomersContainer;
