//@flow

import React from 'react';

import css from './ProjectsContainer.css';
import iconAdd from '../../assets/icon_add.svg';

const Heading = props => {
  return (
    <div className={css.heading}>
      <div className={css.headingTitle}>Heading</div>
      <div className={css.headingButton}>
        <img src={iconAdd} alt="icon add" />
        <span>New Project</span>
      </div>
      <div className={css.headingDetails}>
        <span className={css.headingDetailNumber}> {props.projects} </span>projects
        by
        <span className={css.headingDetailNumber}> {props.members} </span>member
        for
        <span className={css.headingDetailNumber}>
          {' '}
          {props.customers}{' '}
        </span>customers
      </div>
    </div>
  );
};

export default Heading;
