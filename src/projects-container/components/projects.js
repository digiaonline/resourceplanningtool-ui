//@flow

import React from 'react';
import * as PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {isEmpty} from 'lodash';

import defaultPicture from '../../assets/default-picture.png';
import css from './ProjectsContainer.css';

const Projects = ({projects}: {projects: Array<Object>}) => {
  if (projects.length > 0) {
    const Data = projects.map((item: Object) => {
      return <Project key={item.id} Data={item} />;
    });
    return <div className={css.projects}>{Data}</div>;
  }
  return <div className={css.no__project}>There is no matching project!!!</div>;
};

export default Projects;

const Project = ({Data}: {Data: Object}) => (
  <div className={css.project}>
    <Link to={`/projects/${Data.id}`}>
      <img
        className={css.project__picture}
        src={isEmpty(Data.picture) ? defaultPicture : `http://${Data.picture}`}
        alt={Data.name}
      />
    </Link>
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
          .filter((tech: Object, i: number) => i < 3)
          .map((tech, i) => <span key={i}>{tech.name}</span>)}
      </div>
    </div>
  </div>
);

Projects.propsTypes = {
  projects: PropTypes.object.isRequired,
};

Project.propsTypes = {
  Data: PropTypes.object.isRequired,
};
