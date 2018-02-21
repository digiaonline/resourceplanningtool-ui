import React from 'react';
import {Link} from 'react-router-dom';
import css from './ProjectView.css';
import DATA from '../../MOCK_DATA.json';

const ProjectView = props => {
  const Data = DATA[props.match.params.id - 1];
  console.log(Data);
  return (
    <div className={css.project__view}>
      <Link className={css.back__button} to="/projects">
        Back
      </Link>
      <div className={css.project__heading}>
        <div className={css.project__title}>{Data.name}</div>
        <div className={css.project__buttons}>
          <span>DELETE</span>
          <span>EDIT</span>
        </div>
      </div>
      <div className={css.general__details}>
        <div className={css.details}>
          <div className={css.detail__row}>
            <span>Sub-project</span>
            {Data.subProjectName}
          </div>
          <div className={css.detail__row}>
            <span>Customer email</span>
            {Data.customerEmail}
          </div>
          <div className={css.detail__row}>
            <span>Start time</span>/{Data.startTime}
          </div>
          <div className={css.detail__row}>
            <span>End time</span>
            {Data.endTime}
          </div>
          <div className={css.detail__row}>
            <span>Project on-going</span>
            {Data.IsOnGoing ? 'Yes' : 'No'}
          </div>
        </div>
        <div>
          <div className={css.detail__title}>Description</div>
          <p>{Data.longDescription}</p>
        </div>
      </div>
      <div className={css.detail}>
        <div className={css.detail__title}>People in project</div>
        <p> people</p>
      </div>
      <div className={css.detail}>
        <div className={css.detail__title}>Core technologies</div>
        <p> technologies</p>
      </div>
      <div className={css.detail}>
        <div className={css.detail__title}>Live at</div>
        <p>
          <a href={Data.linkLive}>{Data.linkLive}</a>
        </p>
      </div>
      <div className={css.detail}>
        <div className={css.detail__title}>Github</div>
        <p>
          <a href={Data.linkGithub}>{Data.linkGithub}</a>
        </p>
      </div>
      <div className={css.detail}>
        <div className={css.detail__title}>In the news</div>
        <p> News</p>
      </div>
    </div>
  );
};

export default ProjectView;
