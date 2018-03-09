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

  @action
  fetchSkills = async () => {
    try {
      const responseData = await this.makeHttpRequest(`query {
        listSkills {
          id
          name
          level
        }
      }`);
      this.skills = responseData.listSkills;
    } catch (error) {
      console.log('cant fetch skills', error);
    }
  };

  @action
  makeHttpRequest = async (queryString: String) => {
    try {
      const response = await axios.post(
        'http://10.5.0.177:3002/skillz',
        queryString,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new SkillsStore();
