// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import css from './CustomerForm.css';
import closeIcon from '../../assets/icon_close.svg';
import form from '../form-config';

@observer
class CustomerForm extends Component {
  componentWillMount() {
    Modal.setAppElement(document.body);
  }
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
            {this.props.mode === 'edit' ? 'Edit customer' : 'Add customer'}
          </h3>
          <form className={css.container__form} onSubmit={form.onSubmit}>
            <div className={css.form__inputs}>
              <div className={css.form__field}>
                <label htmlFor={form.$('name').id}>
                  <b>{form.$('name').label}</b>
                </label>
                <input
                  {...form.$('name').bind()}
                  className={css.field__input}
                  id="name"
                  type="text"
                  placeholder="name here"
                  value={this.props.customerInfo.name}
                />
                <p>
                  <i>{form.$('name').error}</i>
                </p>
              </div>
              <div className={css.form__field}>
                <label htmlFor={form.$('website').id}>
                  <b>{form.$('website').label}</b>
                </label>
                <input
                  {...form.$('website').bind()}
                  className={css.field__input}
                  id="website"
                  type="text"
                  placeholder="website here"
                  value={this.props.customerInfo.url}
                />
                <p>
                  <i>{form.$('website').error}</i>
                </p>
              </div>
              <div className={css.form__field}>
                <label htmlFor={form.$('industry').id}>
                  <b>{form.$('industry').label}</b>
                </label>
                <input
                  {...form.$('industry').bind()}
                  className={css.field__input}
                  id="industry"
                  type="text"
                  placeholder="industry here"
                  value={this.props.customerInfo.industry}
                />
                <p>
                  <i>{form.$('industry').error}</i>
                </p>
              </div>
            </div>
            <div className={css.form__actions}>
              <button
                className={css.actions__buttonSubmit}
                type="submit"
                onClick={form.onSubmit}
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

CustomerForm.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  toggleForm: PropTypes.func.isRequired,
  customerInfo: PropTypes.object,
  mode: PropTypes.string,
};

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
