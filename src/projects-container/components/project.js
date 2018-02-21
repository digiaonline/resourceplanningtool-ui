import React from 'react';
import css from './ProjectsContainer.css';
import {Link} from 'react-router-dom';

const Project = props => (
  <div className={css.project}>
    <div className={css.projectDetails}>
      <Link to={`/projects/${props.id}`} className={css.projectName}>
        {props.projectName}
      </Link>
      <div className={css.projectView}>
        VIEW ON:
        <a href={props.live}>Live</a>|
        <a href={props.githup}>Github</a>
      </div>
      <div className={css.projectDesciption}>{props.description}</div>
      <div className={css.technologies}>
        <span>PHP</span>
        <span>React</span>
      </div>
    </div>
  </div>
);

export default Project;
