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

@observer
class PeopleContainer extends Component {
  state: {
    formIsOpened: boolean
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      formIsOpened: false,
    };
  }

  componentWillMount() {
    peopleStore.fetchPeople();
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
            form={getForm(fields, plugins, hooks, {})}
          />
        </div>
        <TableWithNavigation
          {...this.props}
          columnHeaders={['PERSON', 'TITLE', 'SKILLS']}
          rowsValue={peopleStore.people}
          displayedFields={['name', 'title', 'skills']}
        />
      </div>
    );
  }
}

const TableWithNavigation = withNavigation(Table, '/people');

export default PeopleContainer;
