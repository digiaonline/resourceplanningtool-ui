// @flow

import {observable, action} from 'mobx';

class UtilityStore {
  @observable isWaiting: Boolean = false;

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
