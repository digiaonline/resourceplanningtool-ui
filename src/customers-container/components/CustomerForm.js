// @flow

import React, {Component} from 'react';
import Modal from 'react-modal';
import css from './CustomerForm.css';
import closeIcon from '../../assets/icon_close.svg';

class CustomerForm extends Component {
  componentWillMount() {
    Modal.setAppElement(document.body);
  }
  saveForm = (event: Event) => {
    event.preventDefault();
    // logic handling saving form goes here
    this.props.toggleForm();
  };
  render() {
    return (
      <Modal isOpen={this.props.isOpened} style={modalStyle}>
        <div className={css.buttonContainer}>
          <img
            alt=""
            src={closeIcon}
            className={css.modal__close}
            onClick={this.props.toggleForm}
          />
        </div>
        <div className={css.formContainer}>
          <h3 className={css.formContainer__h3}>
            {this.props.customerInfo.name ? 'Edit customer' : 'Add customer'}
          </h3>
          <form className={css.container__form}>
            <div className={css.form__inputs}>
              <div className={css.form__field}>
                <label htmlFor="name">
                  <b>Customer</b>
                </label>
                <input
                  className={css.field__input}
                  id="name"
                  type="text"
                  placeholder="name here"
                  value={this.props.customerInfo.name}
                />
              </div>
              <div className={css.form__field}>
                <label htmlFor="website">
                  <b>Website</b>
                </label>
                <input
                  className={css.field__input}
                  id="website"
                  type="text"
                  placeholder="website here"
                  value={this.props.customerInfo.website}
                />
              </div>
              <div className={css.form__field}>
                <label htmlFor="industry">
                  <b>Industry</b>
                </label>
                <input
                  className={css.field__input}
                  id="industry"
                  type="text"
                  placeholder="industry here"
                  value={this.props.customerInfo.industry}
                />
              </div>
            </div>
            <div className={css.form__actions}>
              <button
                className={css.actions__buttonSubmit}
                type="submit"
                onClick={this.saveForm}
              >
                {' '}
                Save{' '}
              </button>
              <button
                className={css.actions__buttonReset}
                type="reset"
                onClick={this.props.toggleForm}
              >
                {' '}
                Cancel{' '}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    padding: 0,
    maxHeight: '600px',
    maxWidth: '1220px',
    margin: '100px auto auto',
  },
};

export default CustomerForm;
