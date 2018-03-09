// @flow

import {observable, action} from 'mobx';
import axios from 'axios';
import {
  getCreateSkillsQuery,
  getAddSkillsForPersonQuery,
  getUpdateSkillsForPersonQuery,
  FETCH_SKILLS_QUERY,
} from './queries';

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
      const responseData = await this.makeHttpRequest(FETCH_SKILLS_QUERY);
      this.skills = responseData.listSkills;
    } catch (error) {
      console.log('cant fetch skills', error);
    }
  };

  @action
  createSkills = async (skills: [Object]) => {
    try {
      const CREATE_SKILLS_QUERY = getCreateSkillsQuery(skills);
      const createSkillsResponse = await this.makeHttpRequest(
        CREATE_SKILLS_QUERY
      );
      return createSkillsResponse;
    } catch (error) {
      console.log('cant create skills', error);
    }
  };

  @action
  addSkillsForPerson = async (personId: Number, skillIds: [Number]) => {
    try {
      const ADD_SKILLS_FOR_PERSON_QUERY = getAddSkillsForPersonQuery(
        personId,
        skillIds
      );
      const addSkillsResponse = await this.makeHttpRequest(
        ADD_SKILLS_FOR_PERSON_QUERY
      );
      return addSkillsResponse;
    } catch (error) {
      console.log('cant create skills', error);
    }
  };

  @action
  updateSkillsForPerson = async (
    personId: Number,
    addedSkillIds: [Number],
    removeSkillIds: [Number]
  ) => {
    const UPDATE_SKILLS_QUERY = getUpdateSkillsForPersonQuery(
      personId,
      addedSkillIds,
      removeSkillIds
    );
    const updateSkillsResponse = await this.makeHttpRequest(
      UPDATE_SKILLS_QUERY
    );
    return updateSkillsResponse;
  };

  @action
  makeHttpRequest = async (queryString: String) => {
    try {
      const response = await axios.post(
        'http://10.5.0.177:3002/skillz',
        queryString,
        {
          headers: {
            'Content-Type': 'application/graphql',
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
