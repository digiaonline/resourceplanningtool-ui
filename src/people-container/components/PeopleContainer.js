// @flow

import React, {Component} from 'react';
import css from './PeopleContainer.css';
import dummyPeople from '../dummyPeople';
import Table from '../../table/components/Table';

class PeopleContainer extends Component {
  render() {
    return (
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.header__headline}>People</div>
          <button type="button" className={css.header__button}>
            <i id="icon" /> NEW PERSON
          </button>
        </div>
        <Table
          columnHeaders={['PERSON', 'TITLE', 'TECHNOLOGIES']}
          rowsValue={dummyPeople}
          displayedFields={['name', 'title', 'location']}
        />
      </div>
    );
  }
}

export default PeopleContainer;
