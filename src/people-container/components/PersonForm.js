// @flow

import React, {Component} from 'react';
import Modal from 'react-modal';
import css from './PersonForm.css';
import closeIcon from '../../assets/icon_close.svg';
import addIcon from '../../assets/icon_add_b.svg';

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
          <h3 className={css.formContainer__h3}>Edit person</h3>
          <div className={css.form__imageContainer}>
            <div className={css.form__image}>
              {/* image will go here */}
              Load image
            </div>
          </div>
          <form>
            <div className={css.form__inputs}>
              <div className={css.inputs__column}>
                <div className={css.form__field__first}>
                  <label htmlFor="name" className={css.input__label}>
                    <b>Name</b>
                  </label>
                  <input type="text" id="name" className={css.form__input} />
                </div>
                <div className={css.form__field}>
                  <label htmlFor="title" className={css.input__label}>
                    <b>Title</b>
                  </label>
                  <input type="text" id="title" className={css.form__input} />
                </div>
                <div className={css.form__field}>
                  <label htmlFor="start-time" className={css.input__label}>
                    <b>Started in Digia</b>
                  </label>
                  <input
                    type="month"
                    id="start-time"
                    className={css.form__input}
                  />
                </div>
              </div>
              <div className={css.columns__divider} />
              <div className={css.inputs__column}>
                <div className={css.form__field__first}>
                  <label htmlFor="location" className={css.input__label}>
                    <b>Location</b>
                  </label>
                  <input
                    type="text"
                    id="location"
                    className={css.form__input}
                  />
                </div>
                <div className={css.form__field}>
                  <label htmlFor="github" className={css.input__label}>
                    <b>Github</b>
                  </label>
                  <input type="url" id="github" className={css.form__input} />
                </div>
                <div className={css.form__field}>
                  <label htmlFor="linkedin" className={css.input__label}>
                    <b>LinkedIn</b>
                  </label>
                  <input type="url" id="linkedin" className={css.form__input} />
                </div>
              </div>
              <div className={css.columns__divider} />
              <div className={css.inputs__column}>
                <div className={css.form__field__first}>
                  <label htmlFor="description" className={css.input__label}>
                    <b>Description</b>
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className={css.form__textarea}
                  />
                </div>
              </div>
            </div>
            <div className={css.form__technologies}>
              <h4 className={css.technologies__h4}>Technology</h4>
              <div className={css.technologies__fields}>
                <div className={css.technologies__input}>
                  <label htmlFor="tech-name" className={css.input__label}>
                    <b>Technology</b>
                  </label>
                  <input
                    type="text"
                    id="tech-name"
                    className={css.form__input}
                  />
                </div>
                <div className={css.technologies__input}>
                  <span className={css.input__label}>
                    <b>Skill level</b>
                  </span>
                  <div className={css.radio}>
                    <div className={css.radio__optionFields}>
                      <input
                        name="level"
                        type="radio"
                        id="tech-level-1"
                        value="1"
                        className={css.radio__option}
                      />
                      <label
                        htmlFor="tech-level-1"
                        className={css.option__label}
                      >
                        1
                      </label>
                    </div>
                    <div className={css.radio__optionFields}>
                      <input
                        name="level"
                        type="radio"
                        id="tech-level"
                        value="2"
                        className={css.radio__option}
                      />
                      <label
                        htmlFor="tech-level-2"
                        className={css.option__label}
                      >
                        2
                      </label>
                    </div>
                    <div className={css.radio__optionFields}>
                      <input
                        name="level"
                        type="radio"
                        id="tech-level"
                        value="3"
                        className={css.radio__option}
                      />
                      <label
                        htmlFor="tech-level-3"
                        className={css.option__label}
                      >
                        3
                      </label>
                    </div>
                  </div>
                </div>
                <div className={css.technologies__input}>
                  <span className={css.input__label}>&nbsp;</span>
                  <button
                    type="button"
                    className={css.technology__create}
                    onClick={this.props.toggleForm}
                  >
                    <img src={addIcon} alt="" />
                    <span>&nbsp;NEW TECHNOLOGY</span>
                  </button>
                </div>
              </div>
              <div className={css.technologies__list}>
                <div className={css.list__technology}>
                  Lumen (3)
                  <img
                    alt=""
                    src={closeIcon}
                    className={css.technology__remove}
                  />
                </div>
                <div className={css.list__technology}>
                  Lumen (3)
                  <img
                    alt=""
                    src={closeIcon}
                    className={css.technology__remove}
                  />
                </div>
                <div className={css.list__technology}>
                  Lumen (3)
                  <img
                    alt=""
                    src={closeIcon}
                    className={css.technology__remove}
                  />
                </div>
                <div className={css.list__technology}>
                  Lumen (3)
                  <img
                    alt=""
                    src={closeIcon}
                    className={css.technology__remove}
                  />
                </div>
                <div className={css.list__technology}>
                  Lumen (3)
                  <img
                    alt=""
                    src={closeIcon}
                    className={css.technology__remove}
                  />
                </div>
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
    maxHeight: '1000px',
    maxWidth: '1220px',
    margin: '100px auto auto',
  },
};

export default PersonForm;
