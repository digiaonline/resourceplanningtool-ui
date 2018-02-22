import React from 'react';
import Project from './project';
import css from './ProjectsContainer.css';

const Projects = props => {
  const Data = props.Data.map(item => {
    return (
      <Project
        key={item.id}
        id={item.id}
        projectName={item.name}
        live={item.linkLive}
        github={item.linkGithub}
        description={item.longDescription}
      />
    );
  });
  return <div className={css.projects}>{Data}</div>;
};

export default Projects;
