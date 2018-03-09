//@flow

import React from 'react';
import {observer} from 'mobx-react';
import ProjectStore from '../store';
import ProjectModal from './projectModal';
import form from '../form';
import css from './ProjectsContainer.css';
import iconAdd from '../../assets/icon_add.svg';

const Heading = observer(({projects, members, customers}) => {
  return (
    <div className={css.heading}>
      <div className={css.headingTitle}>Heading</div>
      <div className={css.headingButton} onClick={ProjectStore.modalToggle}>
        <img src={iconAdd} alt="icon add" />
        <span>NEW PROJECT</span>
      </div>
      <div className={css.headingDetails}>
        <span className={css.headingDetailNumber}>
          {projects}&nbsp;
        </span>projects by
        <span className={css.headingDetailNumber}>
          &nbsp;{members}&nbsp;
        </span>member
        <span className={css.headingDetailNumber}>
          &nbsp;{customers}&nbsp;
        </span>customers
      </div>
      <ProjectModal
        form={form}
        isOpen={ProjectStore.isOpen}
        closeModal={ProjectStore.modalToggle}
        modalName="Create Project"
      />
    </div>
  );
});

export default Heading;
