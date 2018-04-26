// @flow

import {observable, action} from 'mobx';

class UtilityStore {
  @observable isWaiting: boolean = false;
  @observable customerFormState: boolean = false;
  @observable personFormState: boolean = false;

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
