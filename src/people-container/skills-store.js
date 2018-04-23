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
  skills: Array<{
    id: number,
    name: string,
    level: number
  }> = [];

  @action
  fetchSkills = async () => {
    try {
      const responseData: Object = await makeHttpRequest(FETCH_SKILLS_QUERY);
      this.skills = responseData.listSkills;
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant fetch skills', error);
    }
  };

  @action
  createSkills = async (skills: Array<Object>): Object => {
    try {
      const CREATE_SKILLS_QUERY: string = getCreateSkillsQuery(skills);
      const createSkillsResponse: Object = await makeHttpRequest(
        CREATE_SKILLS_QUERY
      );
      return createSkillsResponse;
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant create skills', error);
    }
  };

  @action
  addSkillsForPerson = async (
    personId: number,
    skillIds: Array<number>
  ): Object => {
    try {
      const ADD_SKILLS_FOR_PERSON_QUERY: string = getAddSkillsForPersonQuery(
        personId,
        skillIds
      );
      const addSkillsResponse: Object = await makeHttpRequest(
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
    personId: number,
    addedSkillIds: Array<number>,
    removeSkillIds: Array<number>
  ): ?Object => {
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
