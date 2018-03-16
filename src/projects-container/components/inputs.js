import React from 'react';
import css from './projectModal.css';

export const Input = props => (
  <div className={css.inputSection}>
    <label htmlFor={props.inputID} className={css.label}>
      {props.label}
    </label>
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      id={props.inputID}
    />
  </div>
);

export const InputCheckbox = props => (
  <div className={css.inputSection}>
    <div className={css.label}>{props.label}</div>
    <label className={css.checkboxLabel}>
      <input type="checkbox" />
      <div className={css.squire} />
      <span>Done</span>
    </label>
  </div>
);

export const Textarea = props => (
  <div className={css.inputSection}>
    <label htmlFor={props.inputID} className={css.label}>
      {props.label}
    </label>
    <textarea
      placeholder={props.placeholder}
      value={props.value}
      id={props.inputID}
    />
  </div>
);
