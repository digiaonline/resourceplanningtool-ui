// @flow

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import * as PropTypes from 'prop-types';
import Modal from 'react-modal';

import ProjectStore from '../../projects-container/projects-store';
import {Input} from './inputs';

import css from './projectModal.css';
import closeIcon from '../../assets/icon_close.svg';

@observer
class NewTechnology extends Component {
  state: {
    isOpen: boolean,
    error: string,
  } = {
    isOpen: false,
    error: '',
  };

  modalToggle = () => {
    const {form} = this.props;
    form.$('technologyName').set('value', '');
    form.$('technologyDescription').set('value', '');
    this.setState({
      isOpen: !this.state.isOpen,
      error: '',
    });
  };

  onSubmit = () => {
    const {form} = this.props;
    const name: string = form.$('technologyName').value;
    const description: string = form.$('technologyDescription').value;
    if (name) {
      const technologies = ProjectStore.technologiesList.map(({id, name}) =>
        name.toLowerCase().replace(/\s/g, '')
      );
      const newTechnology = name.toLowerCase().replace(/\s/g, '');
      if (!technologies.includes(newTechnology)) {
        ProjectStore.createTechnology(name, description);
        this.modalToggle();
      } else {
        this.setState({error: 'Technology already avalable'});
      }
    } else {
      this.setState({error: 'Technology name required'});
    }
  };

  render() {
    const {form} = this.props;
    return (
      <div className={css.new__technology}>
        <span onClick={this.modalToggle}>Add New Technology</span>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.isOpen}
          className={css.technology__Modal}
          overlayClassName={css.Overlay}
        >
          <img
            className={css.modal__close}
            src={closeIcon}
            alt="close"
            onClick={this.modalToggle}
          />
          <div className={css.modal__technology__title}>
            Create new technology
          </div>
          <Input field={form.$('technologyName')} />
          <span className={css.helper}>{this.state.error}</span>
          <Input field={form.$('technologyDescription')} />
          <div className={css.form__button}>
            <div className={css.form__button__sava} onClick={this.onSubmit}>
              SAVE
            </div>
            <span
              className={css.form__button__close}
              onClick={this.modalToggle}
            >
              Cancel
            </span>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NewTechnology;

NewTechnology.propTypes = {
  form: PropTypes.object.isRequired,
};
