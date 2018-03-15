//@flow

import React from 'react';
import css from './ProjectsContainer.css';
import ProjectsStore from '../projects-store';

const selectedTechnology = e => {
  ProjectsStore.technologyFilter = e.target.value;
};

const selectedStatus = e => {
  ProjectsStore.statusFilter = e.target.value;
};

const Filters = () => (
  <div className={css.filters}>
    <div className={css.filter}>
      <label htmlFor="technologies">Technology</label>
      <select
        className={css.filters__select}
        id="technologies"
        onChange={e => selectedTechnology(e)}
      >
        <option value="">All</option>
        {ProjectsStore.technologiesList.map(tech => (
          <option key={tech.id} value={tech.name}>
            {tech.name}
          </option>
        ))}
      </select>
    </div>
    <div className={css.filter}>
      <label htmlFor="Status">Status</label>
      <select
        className={css.filters__select}
        id="Status"
        onChange={e => selectedStatus(e)}
      >
        <option value="">All</option>
        <option value="true">On going</option>
        <option value="false">Finished</option>
      </select>
    </div>
  </div>
);

export default Filters;
