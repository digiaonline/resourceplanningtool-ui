//@flow

import React from 'react';
import Modal from 'react-modal';
import ProjectModal from './createProjectForm';
import css from './ProjectsContainer.css';
import iconAdd from '../../assets/icon_add.svg';

const Heading = props => {
  return (
    <div className={css.heading}>
      <div className={css.headingTitle}>Heading</div>
      <div className={css.headingButton} onClick={props.openModal}>
        <img src={iconAdd} alt="icon add" />
        <span>NEW PROJECT</span>
      </div>
      <div className={css.headingDetails}>
        <span className={css.headingDetailNumber}>
          {props.projects}
        </span>projects by
        <span className={css.headingDetailNumber}> {props.members} </span>member
        for
        <span className={css.headingDetailNumber}>
          {props.customers}
        </span>customers
      </div>
      <Modal className={css.Modal} isOpen={props.isOpen} ariaHideApp={false}>
        <ProjectModal closeModal={props.openModal} modalName="Create Project" />
      </Modal>
    </div>
  );
};

export default Heading;
