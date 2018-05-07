// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {PropTypes as MobxPropTypes} from 'mobx-react';
import css from './Table.css';

const Table = (props: Object) => (
  <div className={css[`table__${props.tableName}`]}>
    {
      props.displayedFields.map(field => (
        <div key={field} className={css[`header__${field}`]}>{field}</div>
      ))
    }
    {props.rowsValue.map((row, index) => (
      <Row
        tableName={props.tableName}
        key={index}
        values={row}
        displayedFields={props.displayedFields}
        navigate={props.navigate}
      />
    ))}
  </div>
);

export const Row = (props: Object) => (
  <div
    className={css[`row__${props.tableName}`]}
    onClick={() => {
      props.navigate(props.values.id);
    }}
  >
    {
      props.displayedFields.map(field => (
        <div key={field} className={css[`cell__${field}`]} style={
          getGridPositionStyle(props.displayedFields.indexOf(field) + 1, 1)
        }>
          <Cell label={field} value={props.values[field]} />
        </div>
      ))
    }
  </div>
);

export const Cell = (props: Object) => {
  const {label, value} = props;
  if (label === 'url') {
    return (
      <span>
        <a href={value}>
          {value}
        </a>
      </span>
    );
  } else if (label === 'skills') {
    return (
      <span>
        {value.map(
          skill => `${skill.name}(${skill.level}), `
        )}
      </span>
    );
  } else {
    return <span>{value}</span>;
  }
};

const getGridPositionStyle = (column: number, row: number): {
  gridColumn: string,
  gridRow: string,
} => {
  return {
    gridColumn: `${column} / ${column + 1}`,
    gridRow: `${row} / ${row + 1}`,
  };
};

Table.propTypes = {
  tableName: PropTypes.string.isRequired,
  columnHeaders: PropTypes.arrayOf(PropTypes.string).isRequired, // should have 3 values
  rowsValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    MobxPropTypes.observableArray.isRequired,
  ]),
  displayedFields: PropTypes.arrayOf(PropTypes.string).isRequired, // should have 3 values
};

Row.propTypes = {
  tableName: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  displayedFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  navigate: PropTypes.func,
  row: PropTypes.number.isRequired,
};

Cell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  label: PropTypes.string.isRequired,
};

export default Table;
