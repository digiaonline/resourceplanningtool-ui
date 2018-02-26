import React from 'react';
import css from './ProjectsContainer.css';
import {Link} from 'react-router-dom';

const Project = ({Data}) => (
  <div className={css.project}>
    <div className={css.projectDetails}>
      <Link to={`/projects/${Data.id}`} className={css.projectName}>
        {Data.name}
      </Link>
      <div className={css.projectView}>
        VIEW ON:
        <a href={Data.liveat}>Live</a>|
        <a href={Data.githuburl}>Github</a>
      </div>
      <div className={css.projectDesciption}>{Data.description}</div>
      <div className={css.technologies}>
        {Data.technologies.map((tech, i) => <span key={i}>{tech.name}</span>)}
      </div>
    </div>
  </div>
);

export default Project;
