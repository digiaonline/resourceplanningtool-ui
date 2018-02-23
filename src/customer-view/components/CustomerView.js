// @flow

import React, {Component} from 'react';
import CustomerForm from '../../customers-container/components/CustomerForm';
import css from './CustomerView.css';
import dummyCustomers from '../../customers-container/components/dummyCustomers';
import deleteIcon from '../../assets/icon_delete.svg';
import editIcon from '../../assets/icon_edit.svg';
import backIcon from '../../assets/icon_arrow_back.svg';

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
          <img src={backIcon} alt="" /> <span>&nbsp; BACK </span>
        </button>
        <div className={css.container__customer}>
          <div>
            <h3 className={css.customer__name}> {this.state.customer.name} </h3>
            <div className={css.customer__rows}>
              <div className={css.column__row}>
                <span className={css.row__tag}>Industry</span>
                <span>{this.state.customer.industry}</span>
              </div>
              <div className={css.column__row}>
                <span className={css.row__tag}>Website</span>
                <a href={this.state.customer.website}>
                  {this.state.customer.website}
                </a>
              </div>
            </div>
          </div>
          <div className={css.customer__buttons}>
            <button type="button" className={css.buttonsGroup__button}>
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
          isOpened={this.state.formIsOpened}
          toggleForm={this.toggleForm}
          customerInfo={this.state.customer}
        />
      </div>
    );
  }
}

export default CustomerView;
