//@flow

import {observable, action} from 'mobx';
import Data from '../MOCK_DATA.json';

class ProjectsStore {
  Data: object = Data;
  opanModal: Boolean = false;
}

export default new ProjectsStore();
