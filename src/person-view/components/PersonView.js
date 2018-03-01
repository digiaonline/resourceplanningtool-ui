// @flow

import React, {Component} from 'react';
import css from './PersonView.css';
import dummyPeople from '../../people-container/dummyPeople';

class PersonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: dummyPeople[this.props.match.params.id],
      formIsOpened: false,
    };
  }
  render() {
    return (
      <div className={css.container}>
        <button type="button" className={css.container__backButton}>
          <span id="back" />BACK
        </button>
        <div className={css.container__buttonsGroup}>
          <div>
            <button type="button" className={css.buttonsGroup__button}>
              <span id="delete" />DELETE
            </button>
            <button type="button" className={css.buttonsGroup__button}>
              <span id="edit" />EDIT
            </button>
          </div>
        </div>
        <PersonDetails personDetails={this.state.person} />
      </div>
    );
  }
}

const PersonDetails = props => (
  <div className={css.container__personDetails}>
    <div className={css.personDetails__image}>
      <img src={props.personDetails.imageUrl} alt={props.personDetails.name} />
    </div>
    <div className={css.personDetails__mainInfo}>
      <h4 className={css.mainInfo__name}>{props.personDetails.name}</h4>
      <p className={css.mainInfo__description}>
        {props.personDetails.description}
      </p>
      <div className={css.mainInfo__technologies}>
        {props.personDetails.technologies.map((technology, index) => (
          // hardcoded technology
          <span key={index} className={css.mainInfo__technology}>
            Window
          </span>
        ))}
      </div>
    </div>
    <div className={css.personDetails__minorInfo}>
      <div className={css.minorInfo__column}>
        <h5 className={css.minorInfo__title}>Title</h5>
        <span className={css.minorInfo__row}>
          <b>Started in Digia</b>
        </span>
        <span className={css.minorInfo__row}>
          <b>Location</b>
        </span>
        <span className={css.minorInfo__row}>
          <b>VIEW ON</b>
        </span>
      </div>
      <div className={css.minorInfo__column}>
        <h5 className={css.minorInfo__title}>{props.personDetails.title}</h5>
        <span className={css.minorInfo__row}>
          {props.personDetails.startTimeInDigia}
        </span>
        <span className={css.minorInfo__row}>
          {props.personDetails.location}
        </span>
        <span className={css.minorInfo__rowLinks}>
          <a href={props.personDetails.linkedinLink}>LinkedIn</a>
          <div className={css.links__separateLine} />
          <a href={props.personDetails.githubLink}>Github</a>
        </span>
      </div>
    </div>
  </div>
);

export default PersonView;
