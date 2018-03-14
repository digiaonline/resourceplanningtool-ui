// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {PropTypes as MobxPropTypes} from 'mobx-react';
import css from './Table.css';

const Table = props => (
  <table className={css.container__table}>
    <thead>
      <tr>
        <th className={css.row__firstField}>
          {props.columnHeaders[0]}
          <span id="sort" />{' '}
        </th>
        <th className={css.row__secondField}>{props.columnHeaders[1]}</th>
        <th className={css.row__lastField}>{props.columnHeaders[2]}</th>
      </tr>
    </thead>
    <tbody>
      {props.rowsValue.map((row, index) => (
        <Row
          key={index}
          values={row}
          displayedFields={props.displayedFields}
          navigate={props.navigate}
          index={index}
        />
      ))}
    </tbody>
  </table>
);

export const Row = props => (
  <tr
    onClick={() => {
      props.navigate(props.values.id);
    }}
  >
    <td className={css.row__firstField}>
      <span>{props.values[props.displayedFields[0]]}</span>
    </td>
    <td className={css.row__secondField}>
      {// if the table cell contains a link, we wrap it in <a> tag
        props.displayedFields[1] === 'url' ? (
          <span>
            <a href={props.values[props.displayedFields[1]]}>
              {props.values[props.displayedFields[1]]}
            </a>
          </span>
        ) : (
          <span>{props.values[props.displayedFields[1]]}</span>
        )}
    </td>
    <td className={css.row__lastField}>
      {props.displayedFields[2] !== 'skills' ? (
        <span>{props.values[props.displayedFields[2]]}</span>
      ) : (
        <span>
          {props.values[props.displayedFields[2]].map(
            skill => `${skill.name}(${skill.level}), `
          )}
        </span>
      )}
    </td>
  </tr>
);

Table.propTypes = {
  columnHeaders: PropTypes.arrayOf(PropTypes.string).isRequired, // should have 3 values
  rowsValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    MobxPropTypes.observableArray.isRequired,
  ]),
  displayedFields: PropTypes.arrayOf(PropTypes.string).isRequired, // should have 3 values
};

Row.propTypes = {
  values: PropTypes.object.isRequired,
  displayedFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default Table;
