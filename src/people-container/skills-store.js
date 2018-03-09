// @flow

import {observable, action} from 'mobx';
import axios from 'axios';

class SkillsStore {
  @observable
  skills: [
    {
      id: Number,
      name: String,
      level: Number
    }
  ] = [];
}
