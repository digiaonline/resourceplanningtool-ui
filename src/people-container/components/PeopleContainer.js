// @flow

import React, {Component} from 'react';
import css from './PeopleContainer.css';
import dummyPeople from '../dummyPeople';
import Table from '../../table/components/Table';
import PersonForm from './PersonForm';
import {withNavigation} from '../../table/components/withNavigation';
import addIcon from '../../assets/icon_add_b.svg';

class PeopleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsOpened: false,
    };
  }
  toggleForm = () => {
    this.setState({
      formIsOpened: !this.state.formIsOpened,
    });
  };
  render() {
    return (
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.header__headline}>People</div>
          <button
            type="button"
            className={css.header__button}
            onClick={this.toggleForm}
          >
            <img src={addIcon} alt="" />
            <span>&nbsp; NEW PERSON</span>
          </button>
          <PersonForm
            isOpened={this.state.formIsOpened}
            toggleForm={this.toggleForm}
          />
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
