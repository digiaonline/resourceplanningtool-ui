// @flow

import {observable, action} from 'mobx';
import {
  getCreateSkillsQuery,
  getAddSkillsForPersonQuery,
  getUpdateSkillsForPersonQuery,
  FETCH_SKILLS_QUERY,
} from './queries';
import {makeHttpRequest} from '../utils';

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
      const responseData = await makeHttpRequest(FETCH_SKILLS_QUERY);
      this.skills = responseData.listSkills;
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant fetch skills', error);
    }
  };

  @action
  createSkills = async (skills: [Object]) => {
    try {
      const CREATE_SKILLS_QUERY = getCreateSkillsQuery(skills);
      const createSkillsResponse = await makeHttpRequest(CREATE_SKILLS_QUERY);
      return createSkillsResponse;
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant create skills', error);
    }
  };

  @action
  addSkillsForPerson = async (personId: Number, skillIds: [Number]) => {
    try {
      const ADD_SKILLS_FOR_PERSON_QUERY = getAddSkillsForPersonQuery(
        personId,
        skillIds
      );
      const addSkillsResponse = await makeHttpRequest(
        ADD_SKILLS_FOR_PERSON_QUERY
      );
      return addSkillsResponse;
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant create skills', error);
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
    const updateSkillsResponse = await makeHttpRequest(UPDATE_SKILLS_QUERY);
    return updateSkillsResponse;
  };
}

export default new SkillsStore();
