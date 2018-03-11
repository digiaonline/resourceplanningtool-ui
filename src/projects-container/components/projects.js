import React from 'react';
import {Link} from 'react-router-dom';
import css from './ProjectsContainer.css';

const Projects = ({projects}) => {
  const Data = projects.map(item => {
    return <Project key={item.id} Data={item} />;
  });
  return <div className={css.projects}>{Data}</div>;
};

export default Projects;

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
