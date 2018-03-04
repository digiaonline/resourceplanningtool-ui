import React from 'react';
import {observer} from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import Modal from 'react-modal';
import ProjectStore from '../store';
import {Input, InputCheckbox, Textarea, SELECT} from './inputs';
import css from './projectModal.css';
import closeIcon from '../../assets/icon_close.svg';
import sortIcon from '../../assets/icon_arrow_up.svg';
import deleteIcon from '../../assets/icon_delete.svg';
import addIcon from '../../assets/icon_add_b.svg';

const ProjectModal = observer(
  ({form, isOpen, closeModal, modalName, values}) => {
    return (
      <Modal isOpen={isOpen} className={css.Modal} ariaHideApp={false}>
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
                <Input field={form.$('customer')} />
                <Input field={form.$('customeremail')} />
                <InputCheckbox field={form.$('ongoing')} />
              </div>
              <div className={css.verticalLine} />
              <div className={css.cell}>
                <Input field={form.$('name')} />
                <Input field={form.$('subProject')} />
                <div className={css.inputGroup}>
                  <Input field={form.$('starttime')} />
                  <Input field={form.$('endtime')} />
                </div>
              </div>
            </div>
            <div className={css.formDvider}>Project description</div>
            <div className={css.section}>
              <div className={css.cell1}>
                <Textarea field={form.$('shortdescription')} />
              </div>
              <div className={css.verticalLine} />
              <div className={css.cell2}>
                <Textarea field={form.$('description')} />
              </div>
            </div>
            <div className={css.formDvider}>People in project</div>
            <div className={css.cell}>
              <SELECT field={form.$('members')} />
            </div>
            <div className={css.tableHeader}>
              <div className={css.tableHeaderTitle}>
                PERSON
                <img className={css.formIcon} src={sortIcon} alt="sort" />
              </div>
              <img className={css.formIcon} src={deleteIcon} alt="delete" />
            </div>
            {form.$('members').value.map(({label, value}) => (
              <div key={label} className={css.tableItem}>
                <span>{value}</span>
                <img className={css.formIcon} src={deleteIcon} alt="delete" />
              </div>
            ))}
            <div className={css.formDvider}>Core technologies</div>
            <div className={css.cell}>
              <SELECT field={form.$('usedTechnologies')} />
            </div>
            <div className={css.selectedTech}>
              {form.$('usedTechnologies').value.map(({label, value}) => (
                <div key={label}>
                  {value}
                  <img className={css.removeTech} src={closeIcon} alt="close" />
                </div>
              ))}
            </div>
            <div className={css.formDvider}>Links</div>
            <div className={css.section}>
              <div className={css.cell}>
                <Input field={form.$('liveat')} />
              </div>
              <div className={css.verticalLine} />
              <div className={css.cell}>
                <Input field={form.$('githuburl')} />
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
      </Modal>
    );
  }
);

export default ProjectModal;
