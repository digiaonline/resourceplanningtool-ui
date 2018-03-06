// @flow

import React, {Component} from 'react';
import css from './PeopleContainer.css';
import Table from '../../table/components/Table';
import {withNavigation} from '../../table/components/withNavigation';
import {observer} from 'mobx-react';
import peopleStore from '../people-store';

@observer
class PeopleContainer extends Component {
  componentWillMount() {
    peopleStore.fetchPeople();
  }
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
          rowsValue={peopleStore.people}
          displayedFields={['name', 'title', 'location']}
        />
      </div>
    );
  }
}

const TableWithNavigation = withNavigation(Table, '/people');

export default PeopleContainer;
