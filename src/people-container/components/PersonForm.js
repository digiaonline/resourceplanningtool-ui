// @flow

import React, {Component} from 'react';
import Modal from 'react-modal';
import css from './PersonForm.css';
import closeIcon from '../../assets/icon_close.svg';
import addIcon from '../../assets/icon_add_b.svg';
import {PropTypes} from 'prop-types';

class PersonForm extends Component {
  componentWillMount() {
    Modal.setAppElement(document.body);
  }
  render() {
    const {form} = this.props;
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
            {this.props.mode === 'edit' ? 'Edit Person' : 'Create Person'}
          </h3>
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
                  <label
                    htmlFor={form.$('name').id}
                    className={css.input__label}
                  >
                    <b>{form.$('name').label}</b>
                  </label>
                  <input
                    {...form.$('name').bind()}
                    className={css.form__input}
                  />
                  <p>
                    <i>{form.$('name').error}</i>
                  </p>
                </div>
                <div className={css.form__field}>
                  <label
                    htmlFor={form.$('title').id}
                    className={css.input__label}
                  >
                    <b>{form.$('title').label}</b>
                  </label>
                  <input
                    {...form.$('name').bind()}
                    className={css.form__input}
                  />
                  <p>
                    <i>{form.$('title').error}</i>
                  </p>
                </div>
                <div className={css.form__field}>
                  <label
                    htmlFor={form.$('startdate').id}
                    className={css.input__label}
                  >
                    <b>{form.$('startdate').label}</b>
                  </label>
                  <input
                    {...form.$('startdate').bind()}
                    className={css.form__input}
                  />
                  <p>
                    <i>{form.$('startdate').error}</i>
                  </p>
                </div>
              </div>
              <div className={css.columns__divider} />
              <div className={css.inputs__column}>
                <div className={css.form__field__first}>
                  <label
                    htmlFor={form.$('location').id}
                    className={css.input__label}
                  >
                    <b>{form.$('location').label}</b>
                  </label>
                  <input
                    {...form.$('location').bind()}
                    className={css.form__input}
                  />
                  <p>
                    <i>{form.$('location').error}</i>
                  </p>
                </div>
                <div className={css.form__field}>
                  <label
                    htmlFor={form.$('githuburl').id}
                    className={css.input__label}
                  >
                    <b>{form.$('githuburl').label}</b>
                  </label>
                  <input
                    {...form.$('githuburl').bind()}
                    className={css.form__input}
                  />
                  <p>
                    <i>{form.$('githuburl').error}</i>
                  </p>
                </div>
                <div className={css.form__field}>
                  <label
                    htmlFor={form.$('linkedinurl').id}
                    className={css.input__label}
                  >
                    <b>{form.$('linkedinurl').label}</b>
                  </label>
                  <input
                    {...form.$('linkedinurl').bind()}
                    className={css.form__input}
                  />
                  <p>
                    <i>{form.$('linkedinurl').error}</i>
                  </p>
                </div>
              </div>
              <div className={css.columns__divider} />
              <div className={css.inputs__column}>
                <div className={css.form__field__first}>
                  <label
                    htmlFor={form.$('description').id}
                    className={css.input__label}
                  >
                    <b>{form.$('description').label}</b>
                  </label>
                  <textarea
                    {...form.$('description').bind()}
                    rows="4"
                    className={css.form__textarea}
                  />
                  <p>
                    <i>{form.$('description').error}</i>
                  </p>
                </div>
              </div>
            </div>
            <div className={css.form__technologies}>
              <h4 className={css.technologies__h4}>Technology</h4>
              <div className={css.technologies__fields}>
                <div className={css.technologies__input}>
                  <label
                    htmlFor={form.$('new-skill-name').id}
                    className={css.input__label}
                  >
                    <b>{form.$('new-skill-name').label}</b>
                  </label>
                  <input
                    {...form.$('new-skill-name').bind()}
                    className={css.form__input}
                  />
                  {/* <p>
                    <i>{form.$('new-skill-name').error}</i>
                  </p> */}
                </div>
                <div className={css.technologies__input}>
                  <span className={css.input__label}>
                    <b>{form.$('new-skill-level').label}</b>
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
                {form.$('skills').value.map((skill, index) => (
                  <div className={css.list__technology} key={index}>
                    {skill.name} ({skill.level})
                    <img
                      alt=""
                      src={closeIcon}
                      className={css.technology__remove}
                    />
                  </div>
                ))}
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

PersonForm.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  toggleForm: PropTypes.func.isRequired,
  mode: PropTypes.string,
};

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
