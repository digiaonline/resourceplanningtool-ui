// @flow

import React, {Component} from 'react';
import Modal from 'react-modal';
import Autocomplete from 'react-autocomplete';
import css from './PersonForm.css';
import closeIcon from '../../assets/icon_close.svg';
import addIcon from '../../assets/icon_add_b.svg';
import {PropTypes} from 'prop-types';
import {observer} from 'mobx-react';

@observer
class PersonForm extends Component {
  componentWillMount() {
    Modal.setAppElement(document.body);
  }
  updateRadioInput = (event: Event) => {
    const {form} = this.props;
    form.$('new-skill-level').set('value', event.target.value);
  };
  addNewSkill = () => {
    const {form} = this.props;
    if (form.$('new-skill-name').value && form.$('new-skill-level').value) {
      const skillsList = form.$('skills').value;
      form.$('skills').set('value', [
        ...skillsList,
        {
          level: +form.$('new-skill-level').value,
          name: form.$('new-skill-name').value,
        },
      ]);
    }
  };
  removeSkill = (index: Number) => {
    const {form} = this.props;
    // filter the array of skills and remove the skill with provided index
    form
      .$('skills')
      .set('value', form.$('skills').value.filter((skill, i) => i !== index));
  };
  onChangeSkillName = (event: Event) => {
    const {form} = this.props;
    form.$('new-skill-name').set('value', event.target.value);
  };
  onSelectSkillName = (value: String) => {
    const {form} = this.props;
    form.$('new-skill-name').set('value', value);
  };
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
                  <p className={css.input__warning}>
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
                    {...form.$('title').bind()}
                    className={css.form__input}
                  />
                  <p className={css.input__warning}>
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
                  <p className={css.input__warning}>
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
                  <p className={css.input__warning}>
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
                  <p className={css.input__warning}>
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
                  <p className={css.input__warning}>
                    <i>{form.$('linkedinurl').error}</i>
                  </p>
                </div>
              </div>
              <div className={css.columns__divider} />
              <div className={css.inputs__column}>
                <div className={css.form__field__first}>
                  <label
                    htmlFor={form.$('email').id}
                    className={css.input__label}
                  >
                    <b>{form.$('email').label}</b>
                  </label>
                  <input
                    {...form.$('email').bind()}
                    className={css.form__input}
                  />
                  <p className={css.input__warning}>
                    <i>{form.$('email').error}</i>
                  </p>
                </div>
                <div className={css.form__field}>
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
                  <p className={css.input__warning}>
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
                  {/* autocomplete component here */}
                  <Autocomplete
                    inputProps={{
                      className: css.form__input,
                    }}
                    {...form.$('new-skill-name').bind()}
                    shouldItemRender={(item, value) =>
                      item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    items={['Go', 'PHP', 'C++']}
                    getItemValue={item => item}
                    onChange={this.onChangeSkillName}
                    onSelect={this.onSelectSkillName}
                    renderItem={(item, isHighlighted) => (
                      <div
                        style={{
                          background: isHighlighted ? 'lightgray' : 'white',
                        }}
                      >
                        {item}
                      </div>
                    )}
                  />
                  <p className={css.input__warning}>
                    <i>{form.$('new-skill-name').error}</i>
                  </p>
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
                        value={1}
                        className={css.radio__option}
                        onClick={this.updateRadioInput}
                        checked={form.$('new-skill-level').value === '1'}
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
                        value={2}
                        className={css.radio__option}
                        onClick={this.updateRadioInput}
                        checked={form.$('new-skill-level').value === '2'}
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
                        value={3}
                        className={css.radio__option}
                        onClick={this.updateRadioInput}
                        checked={form.$('new-skill-level').value === '3'}
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
                    onClick={this.addNewSkill}
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
                      onClick={() => {
                        this.removeSkill(index);
                      }}
                    />
                  </div>
                ))}
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
