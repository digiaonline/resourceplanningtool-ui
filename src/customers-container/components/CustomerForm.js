// @flow

import React, {Component} from 'react';
import Modal from 'react-modal';
import css from './CustomerForm.css';

class CustomerForm extends Component {
  render() {
    return (
      <Modal isOpen={true} style={modalStyle}>
        <div className={css.buttonContainer}>
          <span className={css.modal__close}>X</span>
        </div>
        <div className={css.formContainer}>
          <h3 className={css.formContainer__h3}>Edit customer</h3>
          <form className={css.form}>
            <div className={css.form__inputs}>
              <div className={css.form__field}>
                <label htmlFor="name">Customer</label>
                <input
                  className={css.field__input}
                  name="name"
                  type="text"
                  placeholder="name here"
                />
              </div>
              <div className={css.form__field}>
                <label htmlFor="website">Website</label>
                <input
                  className={css.field__input}
                  name="website"
                  type="text"
                  placeholder="website here"
                />
              </div>
              <div className={css.form__field}>
                <label htmlFor="industry">Industry</label>
                <input
                  className={css.field__input}
                  name="industry"
                  type="text"
                  placeholder="industry here"
                />
              </div>
            </div>
            <div className={css.form__actions}>
              <button type="submit"> Save </button>
              <button type="reset"> Cancel </button>
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
    maxHeight: '506px',
    maxWidth: '1220px',
  },
};

export default CustomerForm;
