// @flow

import React from 'react';
import css from './CustomerRow.css';

const CustomerRow = props => (
  <tr
    onClick={() => {
      props.toggleForm(props.customerInfo);
    }}
  >
    <td className={css.row__name}> {props.customerInfo.name} </td>
    <td className={css.row__website}>
      <a href={props.customerInfo.website}> {props.customerInfo.website} </a>
    </td>
    <td className={css.row__industry}> {props.customerInfo.industry} </td>
  </tr>
);

export default CustomerRow;
