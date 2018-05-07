// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import css from './CustomersContainer.css';
import CustomerForm from './CustomerForm';
import Table from '../../table/components/Table';
import {withNavigation} from '../../table/components/withNavigation';
import addIcon from '../../assets/icon_add_b.svg';
import customersStore from '../customers-store';
import {fields, plugins, hooks} from '../../constants/customer-form-config';
import {getForm} from '../../utils';
import utilityStore from '../../utils/utility-store';

@observer
class CustomersContainer extends Component {
  componentWillMount() {
    customersStore.fetchCustomers();
  }

  render() {
    return (
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.header__headline}>Customer</div>
          <button
            type="button"
            className={css.header__button}
            onClick={utilityStore.toggleCustomerForm}
          >
            <img src={addIcon} alt="" />
            <span className={css.button__text}> NEW CUSTOMER</span>
          </button>
          <CustomerForm
            form={getForm(fields, plugins, hooks, {})}
            mode={'new'}
          />
        </div>
        <TableWithNavigation
          {...this.props}
          tableName='customers'
          columnHeaders={['CUSTOMER', 'WEBSITE', 'INDUSTRY']}
          rowsValue={customersStore.customers}
          displayedFields={['name', 'url', 'industry']}
        />
      </div>
    );
  }
}

const TableWithNavigation = withNavigation(Table, '/customers');

export default CustomersContainer;
