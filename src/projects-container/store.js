//@flow

import {observable, action} from 'mobx';
import Data from '../MOCK_DATA.json';

class ProjectsStore {
  @observable Data: object = Data;
  @observable isOpen: Boolean = false;

  @action
  openModal = () => {
    this.isOpen = true;
  };
}

export default new ProjectsStore();
