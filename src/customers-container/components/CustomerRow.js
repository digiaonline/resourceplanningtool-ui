// @flow

import React from 'react';
import PropTypes from 'prop-types';
import css from './CustomerRow.css';

const CustomerRow = props => (
  <tr>
    <td className={css.row__name}> {props.customerInfo.name} </td>
    <td className={css.row__website}>
      <a href={props.customerInfo.website}> {props.customerInfo.website} </a>
    </td>
    <td className={css.row__industry}> {props.customerInfo.industry} </td>
  </tr>
);

CustomerRow.propTypes = {
  customerInfo: PropTypes.shape({
    name: PropTypes.string,
    website: PropTypes.string,
    industry: PropTypes.string,
  }),
};

export default CustomerRow;
