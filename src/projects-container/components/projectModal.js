import React, {Component} from 'react';
import {Input, InputCheckbox, Textarea} from './inputs';
import css from './projectModal.css';
import closeIcon from '../../assets/icon_close.svg';
import sortIcon from '../../assets/icon_arrow_up.svg';
import deleteIcon from '../../assets/icon_delete.svg';

const ProjectModal = props => (
  <div>
    <img
      className={css.modalClose}
      src={closeIcon}
      alt="close"
      onClick={props.closeModal}
    />
    <div className={css.modalTitle}>{props.modalName}</div>
    <form>
      <div className={css.section}>
        <div className={css.cell}>
          <Input
            label="Customer name"
            inputId="custemerName"
            placeholder=""
            value=""
          />
          <Input label="Customer email" inputName="" placeholder="" name="" />
          <InputCheckbox label="Project on-going" />
        </div>
        <div className={css.verticalLine} />
        <div className={css.cell}>
          <Input label="Project name" inputName="" placeholder="" name="" />
          <Input label="Sub-project" inputName="" placeholder="" name="" />
          <div className={css.inputGroup}>
            <Input
              type="month"
              label="Start time (apprx)"
              inputName=""
              placeholder=""
              name=""
            />
            <Input
              type="month"
              label="End time (apprx)"
              inputName=""
              placeholder=""
              name=""
            />
          </div>
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
      <div className={css.formDvider}>People in project</div>
      <div className={css.cell}>
        <Input label="Person" inputName="" placeholder="" name="" />
      </div>
      <div className={css.personTable}>
        <div className={css.personTableTitle}>
          PERSON
          <img className={css.formIcon} src={sortIcon} alt="sort" />
        </div>
        <img className={css.formIcon} src={deleteIcon} alt="delete" />
      </div>
      <div className={css.personItem}>
        <span>12345</span>
        <img className={css.formIcon} src={deleteIcon} alt="delete" />
      </div>
      <div className={css.formDvider}>Core technologies</div>
      <div className={css.cell}>
        <Input label="Technologies" inputName="" placeholder="" name="" />
      </div>
      <div className={css.selectedTech}>
        <div>
          {' '}
          Node<img className={css.removeTech} src={closeIcon} alt="close" />
        </div>
        <div>
          Python<img className={css.removeTech} src={closeIcon} alt="close" />
        </div>
      </div>
      <div className={css.formDvider}>Links</div>
      <div className={css.section2}>
        <div className={css.cell}>
          <Input label="Live at" inputName="" placeholder="" name="" />
        </div>
        <div className={css.verticalLine} />
        <div className={css.cell}>
          <Input label="Github" inputName="" placeholder="" name="" />
        </div>
      </div>
      <div className={css.personTable}>
        <div className={css.personTableTitle}>
          IN THE NEWS
          <img className={css.formIcon} src={sortIcon} alt="sort" />
        </div>
        <img className={css.formIcon} src={deleteIcon} alt="delete" />
      </div>
      <div className={css.personItem} />
      <div className={css.formButton}>
        <div>SAVE</div>
        <span onClick={props.closeModal}>Cancel</span>
      </div>
    </form>
  </div>
);

export default ProjectModal;
