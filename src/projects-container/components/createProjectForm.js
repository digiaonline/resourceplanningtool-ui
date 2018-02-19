import React, {Component} from 'react';
import css from './ProjectsContainer.css';

class ProjectModal extends Component {
  render() {
    return (
      <div>
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
