//@flow

import React from 'react';
import Modal from 'react-modal';

import css from './ProjectsContainer.css';
import iconAdd from '../../assets/icon_add.svg';

const Heading = (props: object) => {
  return (
    <div className={css.heading}>
      <div className={css.headingTitle}>Heading</div>
      <div className={css.headingButton}>
        <img src={iconAdd} alt="icon add" />
        <span>&nbsp;NEW PROJECT</span>
      </div>
      <div className={css.headingDetails}>
        <span className={css.headingDetailNumber}>
          {' '}
          {props.projects}{' '}
        </span>projects by
        <span className={css.headingDetailNumber}> {props.members} </span>member
        for
        <span className={css.headingDetailNumber}>
          {' '}
          {props.customers}{' '}
        </span>customers
      </div>
      <Modal isOpen={false}>
        <h1>hi</h1>
      </Modal>
    </div>
  );
};

export default Heading;
