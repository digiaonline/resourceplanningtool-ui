//@flow

import React from 'react';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import Modal from 'react-modal';

import ProjectStore from '../../projects-container/projects-store';
import PeopleStore from '../../people-container/people-store';
import CustomersStore from '../../customers-container/customers-store';
import utilityStore from '../../utils/utility-store';
import {Input, InputCheckbox, Textarea, SELECT} from './inputs';
import NewsForm from './newsForm';
import NewTechnology from './createTechnology';
import Loading from '../../loading-component/LoadingComponent';

import css from './projectModal.css';
import closeIcon from '../../assets/icon_close.svg';
import sortIcon from '../../assets/icon_arrow_up.svg';
import deleteIcon from '../../assets/icon_delete.svg';
import FormImage from '../../form-image';

const ProjectModal = observer(({form, isOpen, closeModal}) => {
  const onsubmit = (e: Object) => {
    form.onSubmit(e);
    ProjectStore.fetchAllProject();
  };

  const onChangeImage = (event: Object) => {
    form.$('file').set('value', event.target.files[0]);
    const reader = new FileReader();
    reader.onload = e => {
      form.$('picture').set('value', e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const deleteImage = () => {
    form.$('picture').set('value', '');
    form.$('file').set('value', '');
    ProjectStore.pictureUrl = '';
  };
  return (
    <div>
      <Modal
        overlayClassName={css.Overlay}
        ariaHideApp={false}
        isOpen={isOpen}
        className={css.Modal}
      >
        <div>
          <img
            className={css.modal__close}
            src={closeIcon}
            alt="close"
            onClick={closeModal}
          />
          <div className={css.modal__title}>{ProjectStore.formName}</div>
          <form>
            <FormImage
              imgURL={form.$('picture').value}
              deleteImage={deleteImage}
              onChangeImage={onChangeImage}
            />
            <div className={css.section}>
              <div className={css.cell}>
                <SELECT
                  field={form.$('customer')}
                  option={CustomersStore.customers}
                  showValue={true}
                />
                <Input field={form.$('contactemail')} />
                <InputCheckbox field={form.$('ongoing')} />
              </div>
              <div className={css.verticalLine} />
              <div className={css.cell}>
                <Input field={form.$('name')} />
                <Input field={form.$('starttime')} />
                <Input field={form.$('endtime')} />
              </div>
            </div>
            <div className={css.form__dvider}>Project description</div>
            <div className={css.section}>
              <div className={css.cell1}>
                <Textarea field={form.$('shortdescription')} />
              </div>
              <div className={css.verticalLine} />
              <div className={css.cell2}>
                <Textarea field={form.$('description')} />
              </div>
            </div>
            <div className={css.form__dvider}>People in project</div>
            <div className={css.cell}>
              <SELECT
                field={form.$('member')}
                addTo={ProjectStore.addToMembers}
                option={PeopleStore.people}
                showValue={false}
              />
            </div>
            <div className={css.table__header}>
              <div className={css.table__title}>PERSONS</div>
              <img
                className={css.form__icon}
                src={deleteIcon}
                alt="delete"
                onClick={ProjectStore.removeAllMembers}
              />
            </div>
            {form.$('members').value.map((item: Object, i: Number) => {
              // get name from the id in store
              const personName = PeopleStore.people.filter(person => {
                return person.id === item;
              });
              return (
                <div key={i} className={css.table__item}>
                  <span>{personName[0].name}</span>
                  <img
                    className={css.form__icon}
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => ProjectStore.removeMember(item)}
                  />
                </div>
              );
            })}
            <div className={css.form__dvider}>Core technologies</div>
            <div className={css.section}>
              <div className={css.cell}>
                <SELECT
                  field={form.$('usedTechnologies')}
                  addTo={ProjectStore.addToTechnologies}
                  option={ProjectStore.technologiesList}
                  showValue={false}
                />
                <NewTechnology form={form} />
              </div>
            </div>
            <div className={css.selected__tech__container}>
              {form.$('technologies').value.map((tech, i) => {
                // get name from the id in store
                const techName = ProjectStore.technologiesList.filter(
                  ({id, name}) => {
                    return id === tech.name;
                  }
                );
                return (
                  <div key={i} className={css.selected__tech}>
                    {techName[0].name}
                    <img
                      className={css.remove__tech}
                      onClick={() => ProjectStore.removeTechnologie(tech.name)}
                      src={closeIcon}
                      alt="close"
                    />
                  </div>
                );
              })}
            </div>
            <div className={css.form__dvider}>Links</div>
            <div className={css.section}>
              <div className={css.cell}>
                <Input field={form.$('liveat')} />
              </div>
              <div className={css.verticalLine} />
              <div className={css.cell}>
                <Input field={form.$('githuburl')} />
              </div>
            </div>
            <div className={css.table__header}>
              <div className={css.table__title}>
                IN THE NEWS
                <img className={css.form__icon} src={sortIcon} alt="sort" />
              </div>
              <img
                className={css.form__icon}
                src={deleteIcon}
                alt="delete"
                onClick={ProjectStore.removeAllNews}
              />
            </div>
            <div className={css.table__item}>
              <NewsForm />
            </div>
            <div className={css.form__button}>
              <div onClick={onsubmit} className={css.form__button__sava}>
                SAVE
              </div>
              <span onClick={closeModal} className={css.form__button__close}>
                Cancel
              </span>
            </div>
          </form>
        </div>
        {ProjectStore.Redirect && (
          <Redirect to={`/projects/${ProjectStore.newProjectId}`} />
        )}
      </Modal>
      <Loading isOpened={utilityStore.isWaiting} ariaHideApp={false} />
    </div>
  );
});

export default ProjectModal;

ProjectModal.propTypes = {
  form: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
