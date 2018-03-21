import React from 'react';
import {Link} from 'react-router-dom';
import css from './ProjectsContainer.css';

const Projects = ({projects}) => {
  if (projects.length > 0) {
    const Data = projects.map(item => {
      return <Project key={item.id} Data={item} />;
    });
    return <div className={css.projects}>{Data}</div>;
  }
  return <div className={css.no__project}>There is no matching project!!!</div>;
};

export default Projects;

const Project = ({Data}) => (
  <div className={css.project}>
    {Data.picture && (
      <Link to={`/projects/${Data.id}`}>
        <img
          className={css.project__picture}
          src={`http://${Data.picture}`}
          alt={Data.name}
        />
      </Link>
    )}
    <div className={css.projectDetails}>
      <Link to={`/projects/${Data.id}`} className={css.projectName}>
        {Data.name}
      </Link>
      <div className={css.projectView}>
        VIEW ON:
        <a href={Data.liveat}>Live</a>|
        <a href={Data.githuburl}>Github</a>
      </div>
      <div className={css.projectDesciption}>{Data.shortdescription}</div>
      <div className={css.technologies}>
        {Data.technologies
          .filter((tech, i) => i < 3)
          .map((tech, i) => <span key={i}>{tech.name}</span>)}
      </div>
    </div>
  </div>
);
