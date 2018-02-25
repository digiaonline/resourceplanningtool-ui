import React from 'react';
import css from './projectModal.css';
import {observer} from 'mobx-react';

export const Input = observer(({field}) => (
  <div className={css.inputSection}>
    <label htmlFor={field.id} className={css.label}>
      {field.label}
    </label>
    <input {...field.bind()} />
    <small>{field.error}</small>
  </div>
));

export const InputCheckbox = observer(({field}) => (
  <div className={css.inputSection}>
    <div className={css.label}>{field.label}</div>
    <label className={css.checkboxLabel}>
      <input {...field.bind()} type="checkbox" />
      <div className={css.squire} />
      <span>Done</span>
    </label>
  </div>
));

export const Textarea = observer(({field}) => (
  <div className={css.inputSection}>
    <label htmlFor={field.id} className={css.label}>
      {field.label}
    </label>
    <textarea {...field.bind()} />
    <small>{field.error}</small>
  </div>
));
