import React from 'react';
import css from './ProjectsContainer.css';

const Project = props => (
  <div className={css.project}>
    <img
      className={css.projectImg}
      src="http://www.netroxtech.com/video/wp-content/uploads/2016/05/netrox-css.jpg"
      alt=""
    />
    <div className={css.projectDetails}>
      <div className={css.projectName}>{props.projectName}</div>
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
