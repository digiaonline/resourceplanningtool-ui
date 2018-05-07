// @flow

import React, {Component} from 'react';
import css from './PeopleContainer.css';
import Table from '../../table/components/Table';
import PersonForm from './PersonForm';
import {withNavigation} from '../../table/components/withNavigation';
import {observer} from 'mobx-react';
import peopleStore from '../people-store';
import addIcon from '../../assets/icon_add_b.svg';
import {fields, plugins, hooks} from '../../constants/person-form-config';
import {getForm} from '../../utils';
import utilityStore from '../../utils/utility-store';

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
          <button
            type="button"
            className={css.header__button}
            onClick={utilityStore.togglePersonForm}
          >
            <img src={addIcon} alt="" />
            <span className={css.button__text}> NEW PERSON</span>
          </button>
          <PersonForm mode={'new'} form={getForm(fields, plugins, hooks, {})} />
        </div>
        <TableWithNavigation
          {...this.props}
          tableName='people'
          columnHeaders={['PERSON', 'LOCATION', 'TITLE', 'SKILLS']}
          rowsValue={peopleStore.people}
          displayedFields={['name', 'location', 'title', 'skills']}
        />
      </div>
    );
  }
}

const TableWithNavigation = withNavigation(Table, '/people');

export default PeopleContainer;
