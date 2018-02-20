// @flow

import React, {Component} from 'react';
import CustomerForm from '../../customers-container/components/CustomerForm';
import css from './CustomerView.css';
import dummyCustomers from '../../customers-container/components/dummyCustomers';

class CustomerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: dummyCustomers[this.props.match.params.id],
      formIsOpened: false,
    };
  }

  toggleForm = () => {
    this.setState({
      formIsOpened: !this.state.formIsOpened,
    });
  };

  render() {
    return (
      <div className={css.container}>
        <button type="button" className={css.container__backButton}>
          <span id="back-icon" /> BACK
        </button>
        <div className={css.container__customer}>
          <div>
            <h3 className={css.customer__name}> {this.state.customer.name} </h3>
            <div className={css.customer__details}>
              <span className={css.details__field}>
                <b>Industry</b>
              </span>
              {this.state.customer.industry}
            </div>
            <div className={css.customer__details}>
              <span className={css.details__field}>
                <b>Website</b>
              </span>
              <a href={this.state.customer.website}>
                {this.state.customer.website}
              </a>
            </div>
          </div>
          <div className={css.customer__buttons}>
            <button type="button" className={css.buttonsGroup__button}>
              <span id="delete-icon" /> DELETE
            </button>
            <button
              type="button"
              className={css.buttonsGroup__button}
              onClick={this.toggleForm}
            >
              <span id="edit-icon" /> EDIT
            </button>
          </div>
        </div>
        <CustomerForm
          isOpened={this.state.formIsOpened}
          toggleForm={this.toggleForm}
          customerInfo={this.state.customer}
        />
      </div>
    );
  }
}

export default CustomerView;
