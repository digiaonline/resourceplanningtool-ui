// @flow

import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import * as PropTypes from 'prop-types';
import Modal from 'react-modal';

import utilityStore from '../../utils/utility-store';
import {onChangeImage} from '../../utils';
import Loading from '../../loading-component/LoadingComponent';
import css from './CustomerForm.css';
import closeIcon from '../../assets/icon_close.svg';
import ImageUpload from '../../form-image';

@observer
class CustomerForm extends Component {
  @observable previewImage = `http://${this.props.form.$('logo').value}`;

  componentWillMount() {
    Modal.setAppElement(document.body);
  }

  onDeleteImage = (event: Event) => {
    const {form} = this.props;
    form.$('logo').set('value', '');
    form.$('file').set('value', '');
    this.previewImage = '';
  };

  render() {
    const {form} = this.props;
    return (
      <Modal isOpen={utilityStore.customerFormState} style={modalStyle}>
        <div className={css.buttonContainer}>
          <img
            alt=""
            src={closeIcon}
            className={css.modal__close}
            onClick={utilityStore.toggleCustomerForm}
          />
        </div>
        <div className={css.formContainer}>
          <h3 className={css.formContainer__h3}>
            {this.props.mode === 'edit' ? 'Edit customer' : 'Add customer'}
          </h3>
          <form className={css.container__form} onSubmit={form.onSubmit}>
            <ImageUpload
              imgURL={this.previewImage}
              deleteImage={this.onDeleteImage}
              onChangeImage={event => {
                onChangeImage.bind(this)(event, form);
              }}
            />
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
                onClick={utilityStore.toggleCustomerForm}
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
