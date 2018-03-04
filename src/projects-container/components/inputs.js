import React from 'react';
import {observer} from 'mobx-react';
import css from './projectModal.css';
import Select from 'react-select';

export const Input = observer(({field}) => (
  <div className={css.inputSection}>
    <label htmlFor={field.id} className={css.label}>
      {field.label}
    </label>
    <input {...field.bind()} />
    <small className={css.helper}>{field.error}</small>
  </div>
));

export const InputCheckbox = observer(({field}) => (
  <div className={css.inputSection}>
    <div className={css.label}>{field.label}</div>
    <label className={css.checkboxLabel}>
      <input {...field.bind()} />
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
    <small className={css.helper}>{field.error}</small>
  </div>
));

export const SELECT = observer(({field}) => (
  <div className={css.inputSection}>
    <label htmlFor={field.id} className={css.label}>
      {field.label}
    </label>
    <Select.Creatable
      {...field.bind()}
      className={css.x}
      multi={true}
      options={field.options}
    />
    <small className={css.helper}>{field.error}</small>
  </div>
));
