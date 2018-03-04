import React from 'react';
import {observer} from 'mobx-react';
import css from './projectModal.css';
import Select from 'react-styled-select';

export const Input = observer(({field}) => (
  <div className={css.input__section}>
    <label htmlFor={field.id} className={css.label}>
      {field.label}
    </label>
    <input className={css.input} {...field.bind()} />
    <small className={css.helper}>{field.error}</small>
  </div>
));

export const InputCheckbox = observer(({field}) => (
  <div className={css.input__section}>
    <div className={css.label}>{field.label}</div>
    <label className={css.checkbox__label}>
      <input className={css.input__checkbox} {...field.bind()} />
      <div className={css.squire} />
      <span>Done</span>
    </label>
  </div>
));

export const Textarea = observer(({field}) => (
  <div className={css.input__section}>
    <label htmlFor={field.id} className={css.label}>
      {field.label}
    </label>
    <textarea className={css.textarea} {...field.bind()} />
    <small className={css.helper}>{field.error}</small>
  </div>
));

export const SELECT = observer(({field, addTo}) => (
  <div className={css.input__section}>
    <label htmlFor={field.id} className={css.label}>
      {field.label}
    </label>
    <Select
      {...field.bind()}
      multi={false}
      className={css.select}
      onValueClick={addTo}
      options={field.options}
      classes={{
        selectInputField: css.select__input,
        selectValue: css.select__value,
      }}
    />
    <small className={css.helper}>{field.error}</small>
  </div>
));
