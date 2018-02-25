import React from 'react';
import {observer} from 'mobx-react';
import {Input, InputCheckbox, Textarea} from './inputs';
import css from './projectModal.css';
import closeIcon from '../../assets/icon_close.svg';
import sortIcon from '../../assets/icon_arrow_up.svg';
import deleteIcon from '../../assets/icon_delete.svg';
import addIcon from '../../assets/icon_add_b.svg';

const ProjectModal = observer(({form, closeModal, modalName}) => (
  <div>
    <img
      className={css.modalClose}
      src={closeIcon}
      alt="close"
      onClick={closeModal}
    />
    <div className={css.modalTitle}>{modalName}</div>
    <form>
      <div className={css.section}>
        <div className={css.cell}>
          <Input field={form.$('customerName')} />
          <Input field={form.$('customerEmail')} />
          <InputCheckbox field={form.$('isOnGoing')} />
        </div>
        <div className={css.verticalLine} />
        <div className={css.cell}>
          <Input field={form.$('projectName')} />
          <Input field={form.$('subProject')} />
          <div className={css.inputGroup}>
            <Input field={form.$('startTime')} />
            <Input field={form.$('endTime')} />
          </div>
        </div>
      </div>
      <div className={css.formDvider}>Project description</div>
      <div className={css.section}>
        <div className={css.cell1}>
          <Textarea field={form.$('shortDescription')} />
        </div>
        <div className={css.verticalLine} />
        <div className={css.cell2}>
          <Textarea field={form.$('largDescription')} />
        </div>
      </div>
      <div className={css.formDvider}>People in project</div>
      <div className={css.cell}>
        <Input field={form.$('members')} />
      </div>
      <div className={css.tableHeader}>
        <div className={css.tableHeaderTitle}>
          PERSON
          <img className={css.formIcon} src={sortIcon} alt="sort" />
        </div>
        <img className={css.formIcon} src={deleteIcon} alt="delete" />
      </div>
      <div className={css.tableItem}>
        <span>12345</span>
        <img className={css.formIcon} src={deleteIcon} alt="delete" />
      </div>
      <div className={css.formDvider}>Core technologies</div>
      <div className={css.cell}>
        <Input field={form.$('usedTechnologies')} />
      </div>
      <div className={css.selectedTech}>
        <div>
          Node<img className={css.removeTech} src={closeIcon} alt="close" />
        </div>
      </div>
      <div className={css.formDvider}>Links</div>
      <div className={css.section}>
        <div className={css.cell}>
          <Input field={form.$('linkLive')} />
        </div>
        <div className={css.verticalLine} />
        <div className={css.cell}>
          <Input field={form.$('linkGithub')} />
        </div>
      </div>
      <div className={css.tableHeader}>
        <div className={css.tableHeaderTitle}>
          IN THE NEWS
          <img className={css.formIcon} src={sortIcon} alt="sort" />
        </div>
        <img className={css.formIcon} src={deleteIcon} alt="delete" />
      </div>
      <div className={css.tableItem}>
        <div className={css.news__url}>
          <Input field={form.$('otherLinks')} />
          <div className={css.news__url__button}>
            <img src={addIcon} alt="add" /> <span>ADD</span>
          </div>
        </div>
      </div>
      <div className={css.formButton}>
        <div onClick={form.onSubmit}>SAVE</div>
        <span onClick={closeModal}>Cancel</span>
      </div>
    </form>
  </div>
));

export default ProjectModal;
