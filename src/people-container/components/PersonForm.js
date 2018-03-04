// @flow

import React, {Component} from 'react';
import Modal from 'react-modal';
import css from './PersonForm.css';
import closeIcon from '../../assets/icon_close.svg';

class PersonForm extends Component {
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
          <h3>Edit person</h3>
          {/* image will go here */}
          <img alt="" />
          <form>
            <div className={css.form__inputs}>
              <div className={css.inputs__column}>
                <label htmlFor="name">
                  <b>Name</b>
                </label>
                <input type="text" id="name" />
                <label htmlFor="title">
                  <b>Title</b>
                </label>
                <input type="text" id="title" />
                <label htmlFor="start-time">
                  <b>Started in Digia</b>
                </label>
                <input type="month" id="start-time" />
              </div>
              <div className={css.inputs__column}>
                <label htmlFor="location">
                  <b>Location</b>
                </label>
                <input type="text" id="location" />
                <label htmlFor="github">
                  <b>Github</b>
                </label>
                <input type="url" id="github" />
                <label htmlFor="linkedin">
                  <b>LinkedIn</b>
                </label>
                <input type="url" id="linkedin" />
              </div>
              <div className={css.inputs__column}>
                <label htmlFor="description">
                  <b>Description</b>
                </label>
                <textarea id="description" rows="5" />
              </div>
            </div>
            <div className={css.form__technologies}>
              <h4>Technology</h4>
              <div className={css.technologies__fields}>
                <div className={css.technologies__input}>
                  <label htmlFor="tech-name">
                    <b>Technology</b>
                  </label>
                  <input type="text" id="tech-name" />
                </div>
                <div className={css.technologies__input}>
                  <input type="radio" id="tech-level-1" value="1" />
                  <label htmlFor="tech-level-1">1</label>
                  <input type="radio" id="tech-level" value="1" />
                  <label htmlFor="tech-level-2">2</label>
                  <input type="radio" id="tech-level" value="1" />
                  <label htmlFor="tech-level-3">3</label>
                </div>
              </div>
              <div className={css.technologies__list}>
                <div className={css.list__technology}>Lumen (3)</div>
                <div className={css.list__technology}>Lumen (3)</div>
                <div className={css.list__technology}>Lumen (3)</div>
                <div className={css.list__technology}>Lumen (3)</div>
                <div className={css.list__technology}>Lumen (3)</div>
                <div className={css.list__technology}>Lumen (3)</div>
              </div>
            </div>
            <div className={css.form__actions}>
              <button className={css.actions__buttonSubmit} type="submit">
                {' '}
                Save{' '}
              </button>
              <button className={css.actions__buttonReset} type="reset">
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
    maxWidth: '1220px',
    margin: '100px auto auto',
  },
};

export default PersonForm;
