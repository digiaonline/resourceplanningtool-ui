import React from 'react';
import Project from './project';
import css from './ProjectsContainer.css';

const Projects = ({projects}) => {
  const Data = projects.map(item => {
    return <Project key={item.id} Data={item} />;
  });
  return <div className={css.projects}>{Data}</div>;
};

export default Projects;
