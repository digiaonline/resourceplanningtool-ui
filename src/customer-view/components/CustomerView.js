// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import CustomerForm from '../../customers-container/components/CustomerForm';
import css from './CustomerView.css';
import deleteIcon from '../../assets/icon_delete.svg';
import editIcon from '../../assets/icon_edit.svg';
import backIcon from '../../assets/icon_arrow_back.svg';
import customersStore from '../../customers-container/customers-store';
import {getForm} from '../../utils';
import {fields, plugins, hooks} from '../../constants/customer-form-config';
import LoadFailedRedirect from '../../redirect-component/components/Redirect';

@observer
class CustomerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsOpened: false,
    };
  }

  toggleForm = () => {
    this.setState({
      formIsOpened: !this.state.formIsOpened,
    });
  };

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
    const customer = customersStore.customers.find(
      customer => customer.id === this.props.match.params.id
    );
    if (!customer) {
      return (
        <LoadFailedRedirect
          message={`Timeout, no customer with id "${this.props.match.params
            .id}" was found`}
        />
      );
    }
    return (
      <div className={css.container}>
        <Link className={css.container__backButton} to="/customers">
          <img src={backIcon} alt="back" /> <span>&nbsp;BACK </span>
        </Link>
        <div className={css.container__customer}>
          <div>
            <h3 className={css.customer__name}> {customer.name} </h3>
            <img
              className={css.customer__logo}
              src={`http://${customer.logo}`}
              alt={customer.name}
            />
            <div className={css.customer__rows}>
              <div className={css.column__row}>
                <span className={css.row__tag}>Industry</span>
                <span>{customer.industry}</span>
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
              <span>&nbsp; DELETE</span>
            </button>
            <button
              type="button"
              className={css.buttonsGroup__button}
              onClick={this.toggleForm}
            >
              <img alt="" src={editIcon} />
              <span>&nbsp; EDIT</span>
            </button>
          </div>
        </div>
        <CustomerForm
          form={getForm(fields, plugins, hooks, customer)}
          isOpened={this.state.formIsOpened}
          toggleForm={this.toggleForm}
          mode={'edit'}
        />
      </div>
    );
  }
}

export default CustomerView;
