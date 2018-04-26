// @flow

import {observable, action} from 'mobx';

class UtilityStore {
  @observable isWaiting: Boolean = false;
  @observable customerFormState: Boolean = false;
  @observable personFormState: Boolean = false;

  @action
  toggleCustomerForm = () => {
    this.customerFormState = !this.customerFormState;
  };

  @action
  togglePersonForm = () => {
    this.personFormState = !this.personFormState;
  };

  @action
  turnOffWaiting = () => {
    this.isWaiting = false;
  };

  @action
  turnOnWaiting = () => {
    this.isWaiting = true;
  };
}

export default new UtilityStore();
