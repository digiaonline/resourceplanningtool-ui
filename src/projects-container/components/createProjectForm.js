import React, {Component} from 'react';
import css from './ProjectsContainer.css';

class ProjectModal extends Component {
  render() {
    return (
      <div>
        <div className={css.modalTitle}>{this.props.modalName}</div>
        <form />
      </div>
    );
  }
}

export default ProjectModal;

const Form1 = () => (
  <div className={css.section}>
    <div className={css.cell}>
      <div className={css.inputGroup}>
        <label className={css.label}>Customer name</label>
        <input />
      </div>
      <div className={css.inputGroup}>
        <label className={css.label}>Customer email</label>
        <input />
      </div>
      <div className={css.checkboxGroup}>
        <div className={css.inputGroup}>
          <div className={css.label}>Customer feedback</div>
          <label className={css.checkboxLabel}>
            <input type="checkbox" />
            <div className={css.squire} />
            <span>Done</span>
          </label>
        </div>
        <div className={css.inputGroup}>
          <div className={css.label}>Customer entered in CV's</div>
          <label className={css.checkboxLabel}>
            <input type="checkbox" />
            <div className={css.squire} />
            <span>Done</span>
          </label>
        </div>
      </div>
    </div>
    <div className={css.verticalLine} />
    <div className={css.cell}>
      <div className={css.inputGroup}>
        <label className={css.label}>Project name</label>
        <input />
      </div>
      <div className={css.inputGroup}>
        <label className={css.label}>Sub-project</label>
        <input />
      </div>
      <div className={css.checkboxGroup}>
        <div className={css.inputGroup}>
          <label className={css.label}>Start time (apprx)</label>
          <input />
        </div>
        <div className={css.inputGroup}>
          <label className={css.label}>End time (apprx)</label>
          <input />
        </div>
      </div>
    </div>
    <div className={css.verticalLine} />
    <div className={css.cell}>
      <div className={css.checkboxGroup}>
        <div className={css.inputGroup}>
          <div className={css.label}>Project on-goin</div>
          <label className={css.checkboxLabel}>
            <input type="checkbox" />
            <div className={css.squire} />
            <span>Done</span>
          </label>
        </div>
        <div className={css.inputGroup}>
          <div className={css.label}>Project retro</div>
          <label className={css.checkboxLabel}>
            <input type="checkbox" />
            <div className={css.squire} />
            <span>Done</span>
          </label>
        </div>
      </div>
      <div className={css.inputGroup}>
        <label className={css.label}>Bose project manager</label>
        <input />
      </div>
      <div className={css.inputGroup}>
        <label className={css.label}>Bose ID</label>
        <input />
      </div>
    </div>
  </div>
);
