// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import css from './CustomerForm.css';

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
          <span className={css.modal__close} onClick={this.props.toggleForm}>
            X
          </span>
        </div>
        <div className={css.formContainer}>
          <h3 className={css.formContainer__h3}>
            {this.props.customerInfo.name ? 'Edit customer' : 'Add customer'}
          </h3>
          <form className={css.form}>
            <div className={css.form__inputs}>
              <div className={css.form__field}>
                <label htmlFor="name" className={css.field__label}>
                  Customer
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
                <label htmlFor="website" className={css.field__label}>
                  Website
                </label>
                <input
                  className={css.field__input}
                  id="website"
                  type="text"
                  placeholder="website here"
                  value={this.props.customerInfo.website}
                />
              </div>
              <div className={css.form__lastField}>
                <label htmlFor="industry" className={css.field__label}>
                  Industry
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

// type checking props passed to CustomerForm
CustomerForm.propTypes = {
  customerInfo: PropTypes.shape({
    name: PropTypes.string,
    website: PropTypes.string,
    industry: PropTypes.string,
  }),
  toggleForm: PropTypes.func.isRequired,
};

// custom style for the modal
const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    padding: 0,
    maxHeight: '506px',
    maxWidth: '1220px',
    margin: '150px auto auto',
  },
};

export default CustomerForm;
