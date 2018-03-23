//@flow

import React from 'react';
import {observer} from 'mobx-react';
import {PropTypes} from 'prop-types';
import Select from 'react-styled-select';

import css from './projectModal.css';

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

export const SELECT = observer(({field, addTo, option, showValue}) => {
  const options = option
    ? option.map((item: Object) => {
      const id = item.id ? item.id : Math.random();
      return {value: id, label: item.name};
    })
    : [];
  options.sort(function(a, b) {
    return a.label.toUpperCase() > b.label.toUpperCase()
      ? 1
      : b.label.toUpperCase() > a.label.toUpperCase() ? -1 : 0;
  });
  return (
    <div className={css.input__section}>
      <label htmlFor={field.id} className={css.label}>
        {field.label}
      </label>
      <Select
        {...field.bind()}
        multi={false}
        className={css.select}
        onValueClick={addTo}
        options={options}
        classes={{
          selectValue: !showValue ? css.select__value : '',
          selectInput: css.select__input,
        }}
      />
      <small className={css.helper}>{field.error}</small>
    </div>
  );
});

Input.propTypes = {
  field: PropTypes.object.isRequired,
};

InputCheckbox.propTypes = {
  field: PropTypes.object.isRequired,
};

Textarea.propTypes = {
  field: PropTypes.object.isRequired,
};

SELECT.propTypes = {
  field: PropTypes.object.isRequired,
  addTo: PropTypes.func,
  option: PropTypes.object.isRequired,
  showValue: PropTypes.bool,
};
