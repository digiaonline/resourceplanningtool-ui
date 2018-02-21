// @flow

import React from 'react';
import css from './Table.css';

const Table = props => (
  <table className={css.container__table}>
    <thead>
      <tr>
        <th className={css.row__name}>
          {props.columnHeaders[0]}
          <span id="sort" />{' '}
        </th>
        <th className={css.row__website}>{props.columnHeaders[1]}</th>
        <th className={css.row__industry}>{props.columnHeaders[2]}</th>
      </tr>
    </thead>
    <tbody>
      {props.rowsValue.map((row, index) => (
        <Row key={index} values={row} displayedFields={props.displayedFields} />
      ))}
    </tbody>
  </table>
);

export const Row = props => (
  <tr>
    <td className={css.row__name}>
      {' '}
      {props.values[props.displayedFields[0]]}{' '}
    </td>
    <td className={css.row__website}>
      {props.values[props.displayedFields[1]]}
    </td>
    <td className={css.row__industry}>
      {props.values[props.displayedFields[2]]}
    </td>
  </tr>
);

Table.propTypes = {
  columnHeaders: [String], // should have 3 values
  rowsValue: [],
  displayedFields: [String], // should have 3 values
};

Row.propTypes = {
  values: Object,
  displayedFields: [String],
};

export default Table;
