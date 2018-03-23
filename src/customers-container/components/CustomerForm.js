// @flow

import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import utilityStore from '../../utils/utility-store';
import Loading from '../../loading-component/LoadingComponent';
import css from './CustomerForm.css';
import closeIcon from '../../assets/icon_close.svg';

@observer
class CustomerForm extends Component {
  @observable previewImage = `http://${this.props.form.$('logo').value}`;

  componentWillMount() {
    Modal.setAppElement(document.body);
  }
  onChangeImage = event => {
    const {form} = this.props;
    form.$('file').set('value', event.target.files[0]);
    const reader = new FileReader();
    reader.onload = e => {
      this.previewImage = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  render() {
    const {form} = this.props;
    const imagePreview = {
      backgroundImage: `url(${this.previewImage})`,
      backgroundSize: 'contain',
    };
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
            <div className={css.form__imageContainer}>
              <div className={css.form__image} style={imagePreview} />
              <input
                className={css.form__imageInput}
                type="file"
                value=""
                onChange={this.onChangeImage}
              />
            </div>
            <div className={css.form__inputs}>
              <div className={css.form__field}>
                <label htmlFor={form.$('name').id}>
                  <b>{form.$('name').label}</b>
                </label>
                <input
                  {...form.$('name').bind()}
                  className={css.field__input}
                />
                <p>
                  <i className={css.input__warning}>{form.$('name').error}</i>
                </p>
              </div>
              <div className={css.form__field}>
                <label htmlFor={form.$('url').id}>
                  <b>{form.$('url').label}</b>
                </label>
                <input {...form.$('url').bind()} className={css.field__input} />
                <p>
                  <i className={css.input__warning}>{form.$('url').error}</i>
                </p>
              </div>
              <div className={css.form__field}>
                <label htmlFor={form.$('industry').id}>
                  <b>{form.$('industry').label}</b>
                </label>
                <input
                  {...form.$('industry').bind()}
                  className={css.field__input}
                />
                <p>
                  <i className={css.input__warning}>
                    {form.$('industry').error}
                  </i>
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
        <Loading isOpened={utilityStore.isWaiting} />
      </Modal>
    );
  }
}

CustomerForm.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  toggleForm: PropTypes.func.isRequired,
  mode: PropTypes.string,
  form: PropTypes.object.isRequired,
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
