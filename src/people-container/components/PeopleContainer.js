// @flow

import React, {Component} from 'react';
import css from './PeopleContainer.css';
import dummyPeople from '../dummyPeople';
import Table from '../../table/components/Table';
import {withNavigation} from '../../table/components/withNavigation';

class PeopleContainer extends Component {
  render() {
    return (
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.header__headline}>People</div>
          <button type="button" className={css.header__button}>
            <span className={css.button__plusIcon} /> NEW PERSON
          </button>
        </div>
        <TableWithNavigation
          {...this.props}
          columnHeaders={['PERSON', 'TITLE', 'TECHNOLOGIES']}
          rowsValue={dummyPeople}
          displayedFields={['name', 'title', 'location']}
        />
      </div>
    );
  }
}

const TableWithNavigation = withNavigation(Table, '/people');

export default PeopleContainer;
