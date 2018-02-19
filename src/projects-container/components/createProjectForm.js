import React, {Component} from 'react';
import css from './ProjectsContainer.css';
import close from '../../assets/icon_close.svg';

class ProjectModal extends Component {
  render() {
    console.log(this.props.closeModal);
    return (
      <div>
        <img
          className={css.modalClose}
          src={close}
          alt="close"
          onClick={this.props.closeModal}
        />
        <div className={css.modalTitle}>{this.props.modalName}</div>
        <form>
          <div className={css.section}>
            <div className={css.cell}>
              <InputText
                label="Customer name"
                inputId="custemerName"
                placeholder=""
                value=""
              />
              <InputText
                label="Customer email"
                inputName=""
                placeholder=""
                name=""
              />
              <div className={css.inputGroup}>
                <InputCheckbox label="Customer feedback" />
                <InputCheckbox label="Project entered in CV's" />
              </div>
            </div>
            <div className={css.verticalLine} />
            <div className={css.cell}>
              <InputText
                label="Project name"
                inputName=""
                placeholder=""
                name=""
              />
              <InputText
                label="Sub-project"
                inputName=""
                placeholder=""
                name=""
              />
              <div className={css.inputGroup}>
                <InputText
                  label="Start time (apprx)"
                  inputName=""
                  placeholder=""
                  name=""
                />
                <InputText
                  label="End time (apprx)"
                  inputName=""
                  placeholder=""
                  name=""
                />
              </div>
            </div>
            <div className={css.verticalLine} />
            <div className={css.cell}>
              <div className={css.inputGroup}>
                <InputCheckbox label="Project on-going" />
                <InputCheckbox label="project retro" />
              </div>
              <InputText
                label="Bose project manager"
                inputName=""
                placeholder=""
                name=""
              />
              <InputText label="Bose ID" inputName="" placeholder="" name="" />
            </div>
          </div>
          <div className={css.formDvider}>Project description</div>
          <div className={css.section}>
            <div className={css.cell1}>
              <Textarea
                label="One-sentence project description"
                inputName=""
                placeholder=""
                name=""
              />
            </div>
            <div className={css.verticalLine} />
            <div className={css.cell2}>
              <Textarea
                label="Larger description"
                inputName=""
                placeholder=""
                name=""
              />
            </div>
          </div>
          <div className={css.formDvider}>Core technologies</div>
          <div className={css.cell1}>
            <InputText
              label="Project name"
              inputName=""
              placeholder=""
              name=""
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ProjectModal;

const InputText = props => (
  <div className={css.inputSection}>
    <label htmlFor={props.inputID} className={css.label}>
      {props.label}
    </label>
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      id={props.inputID}
    />
  </div>
);

const InputCheckbox = props => (
  <div className={css.inputSection}>
    <div className={css.label}>{props.label}</div>
    <label className={css.checkboxLabel}>
      <input type="checkbox" />
      <div className={css.squire} />
      <span>Done</span>
    </label>
  </div>
);

const Textarea = props => (
  <div className={css.inputSection}>
    <label htmlFor={props.inputID} className={css.label}>
      {props.label}
    </label>
    <textarea
      placeholder={props.placeholder}
      value={props.value}
      id={props.inputID}
    />
  </div>
);
