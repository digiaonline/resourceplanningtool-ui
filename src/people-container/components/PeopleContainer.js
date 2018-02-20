// @flow

import React, {Component} from 'react';
import css from './PeopleContainer.css';
import dummyPeople from '../dummyPeople';

class PeopleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: dummyPeople,
    };
  }
  render() {
    return (
      // sorry, the code is copied from peorson-container for now
      // refactor later
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.header__headline}>People</div>
          <button type="button" className={css.header__button}>
            <i id="icon" /> NEW PERSON
          </button>
        </div>
        <table className={css.container__table}>
          <thead>
            <tr>
              <th className={css.row__name}>
                {' '}
                PERSON <span id="sort" />{' '}
              </th>
              <th className={css.row__website}> TITLE </th>
              <th className={css.row__industry}> TECHNOLOGIES </th>
            </tr>
          </thead>
          <tbody>
            {this.state.people.map((id, index) => (
              <PersonRow key={index} personInfo={this.state.people[index]} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const PersonRow = props => (
  <tr>
    <td className={css.row__name}> {props.personInfo.name} </td>
    <td className={css.row__website}>{props.personInfo.title}</td>
    <td className={css.row__industry}>
      {' '}
      {props.personInfo.technologies[1].id}{' '}
    </td>
  </tr>
);

export default PeopleContainer;
