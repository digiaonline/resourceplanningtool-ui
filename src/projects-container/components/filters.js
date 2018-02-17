//@flow

import React from 'react';
import css from './ProjectsContainer.css';

const Filters = () => (
  <div className={css.filters}>
    <div className={css.filter}>
      <label htmlFor="x">Technology</label>
      <select id="x">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
    </div>
    <div className={css.filter}>
      <label htmlFor="y">Status</label>
      <select id="y">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
    </div>
  </div>
);

export default Filters;
