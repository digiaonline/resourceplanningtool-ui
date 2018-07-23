// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {isEmpty} from 'lodash';
import {Link} from 'react-router-dom';

import CustomerForm from '../../customers-container/components/CustomerForm';
import css from './CustomerView.css';
import deleteIcon from '../../assets/icon_delete.svg';
import editIcon from '../../assets/icon_edit.svg';
import backIcon from '../../assets/icon_arrow_back.svg';
import defaultPicture from '../../assets/default-picture.png';
import customersStore from '../../customers-container/customers-store';
import {getForm} from '../../utils';
import {fields, plugins, hooks} from '../../constants/customer-form-config';
import LoadFailedRedirect from '../../redirect-component/components/Redirect';
import utilityStore from '../../utils/utility-store';

@observer
class CustomerView extends Component {
  onDelete = () => {
    customersStore.deleteCustomer(this.props.match.params.id);
    this.props.history.push('/customers');
  };

  componentWillMount() {
    if (!customersStore.customers[this.props.match.params.id]) {
      customersStore.fetchCustomers();
    }
  }

  render() {
    // find the customer with specific id from the store
    const customer =
      customersStore.customers.find(
        customer => customer.id === this.props.match.params.id
      ) || {};
    if (!customer) {
      const customerId = this.props.match.params.id;
      return (
        <LoadFailedRedirect
          message={`Timeout, no customer with id "${customerId}" was found`}
        />
      );
    }
    return (
      <div className={css.container}>
        <div className={css.container__backButton} onClick={this.props.history.goBack}>
          <img src={backIcon} alt="back" />{' '}
          <span className={css.button__text}> BACK </span>
        </div>
        <div className={css.container__customer}>
          <div>
            <h3 className={css.customer__name}> {customer.name} </h3>
            <img
              className={css.customer__logo}
              src={
                isEmpty(customer.logo) ? (
                  defaultPicture
                ) : (
                  `http://${customer.logo}`
                )
              }
              alt={customer.name}
            />
            <div className={css.customer__rows}>
              <div className={css.column__row}>
                <span className={css.row__tag}>Industry</span>
                <span>{customer.industry}</span>
              </div>
              <div className={css.column__row}>
                <span className={css.row__tag}>Projects</span>
                {!isEmpty(customer.projects) ? (
                  customer.projects.map((project, index) => (
                    <Link
                      to={`/projects/${project.id}`}
                      key={project.id}
                      className={css.rowTag__customerProjects}
                    >
                      {/* separate item with a comma except for the last item */}
                      {`${project.name}${customer.projects.length === index + 1
                        ? ''
                        : ', '}`}
                    </Link>
                  ))
                ) : (
                  <span>Not available</span>
                )}
              </div>
              <div className={css.column__row}>
                <span className={css.row__tag}>Website</span>
                <a href={customer.url}>{customer.url}</a>
              </div>
            </div>
          </div>
          <div className={css.customer__buttons}>
            <button
              type="button"
              className={css.buttonsGroup__button}
              onClick={this.onDelete}
            >
              <img alt="" src={deleteIcon} />
              <span className={css.button__text}> DELETE</span>
            </button>
            <button
              type="button"
              className={css.buttonsGroup__button}
              onClick={utilityStore.toggleCustomerForm}
            >
              <img alt="" src={editIcon} />
              <span className={css.button__text}> EDIT</span>
            </button>
          </div>
        </div>
        <CustomerForm
          form={getForm(fields, plugins, hooks, customer)}
          mode={'edit'}
        />
      </div>
    );
  }
}

export default CustomerView;
