// @flow

import {observable, action} from 'mobx';
import skillsStore from './skills-store';
import {isEmpty, makeHttpRequest} from '../utils';
import utilityStore from '../utils/utility-store';
import {
  FETCH_PEOPLE_QUERY,
  getCreatePersonQuery,
  getUpdatePersonQuery,
  getDeletePersonQuery,
} from './queries';

class PeopleStore {
  // typechecking and initial value for list of people
  @observable
  people: Array<{
    name: string,
    description: string,
    id: string,
    githuburl: string,
    linkedinurl: string,
    email: string,
    picture: string,
    location: string,
    startdate: number,
    title: string,
    skills: Array<{
      level: number,
      name: string
    }>
  }> = [];

  @action
  fetchPeople = async () => {
    try {
      const responseData = await makeHttpRequest(FETCH_PEOPLE_QUERY);
      this.people = responseData.listPersons;
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant fetch people', error);
    }
  };

  // pardon me this messy part, refactor later
  @action
  createPerson = async (personInfo: Object) => {
    try {
      const CREATE_PERSON_QUERY: string = getCreatePersonQuery(
        personInfo.name,
        personInfo.description,
        personInfo.picture,
        personInfo.startdate,
        personInfo.email,
        personInfo.title,
        personInfo.location,
        personInfo.githuburl,
        personInfo.linkedinurl
      );
      let createSkillsResponse: ?Object = {};
      let addSkillsResponse: ?Object = {};
      // wait to finish creating a person
      const createPersonResponse = await makeHttpRequest(CREATE_PERSON_QUERY);
      if (personInfo.skills.length > 0) {
        // wait to finish creating skills
        createSkillsResponse = await skillsStore.createSkills(
          personInfo.skills
        );
        // wait to finish adding created skills to created person
        addSkillsResponse = await skillsStore.addSkillsForPerson(
          createPersonResponse.createPerson.id,
          Object.values(createSkillsResponse).map(
            skillResponse => +skillResponse.id
          )
        );
      }
      // check if all needed requests were successful
      if (
        createPersonResponse.createPerson &&
        Object.values(addSkillsResponse).indexOf(false) <= -1
      ) {
        // TODO: proper notification to be implemented
        console.info('create person successfully');
        this.fetchPeople();
      }
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant create person', error);
    }
    utilityStore.turnOffWaiting();
  };

  @action
  deletePerson = async (id: number) => {
    try {
      const DELETE_PERSON_QUERY = getDeletePersonQuery(id);
      const response = await makeHttpRequest(DELETE_PERSON_QUERY);
      if (response.removePerson) {
        // TODO: proper notification to be implemented
        console.info('delete person successfully');
        this.fetchPeople();
      }
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant delete person');
    }
  };

  @action
  updatePerson = async (personInfo: Object) => {
    try {
      const GET_UPDATE_PERSON_QUERY = getUpdatePersonQuery(
        personInfo.name,
        personInfo.description,
        personInfo.picture,
        personInfo.startdate,
        personInfo.email,
        personInfo.title,
        personInfo.location,
        personInfo.githuburl,
        personInfo.linkedinurl,
        personInfo.id
      );
      let createSkillsResponse: ?Object = {};
      let updateSkillsResponse: ?Object = {};
      const updatePersonResponse = await makeHttpRequest(
        GET_UPDATE_PERSON_QUERY
      );
      if (personInfo.addedSkills.length > 0) {
        createSkillsResponse = await skillsStore.createSkills(
          personInfo.addedSkills
        );
      }
      if (
        personInfo.removedSkills.length > 0 ||
        !isEmpty(createSkillsResponse)
      ) {
        updateSkillsResponse = await skillsStore.updateSkillsForPerson(
          personInfo.id,
          personInfo.removedSkills.map(skill => skill.id),
          Object.values(createSkillsResponse).map(
            skillResponse => +skillResponse.id
          )
        );
      }
      if (
        updatePersonResponse.updatePerson &&
        Object.values(updateSkillsResponse).indexOf(false) <= -1
      ) {
        this.fetchPeople();
        // TODO: proper notification to be implemented
        console.info('update person successful');
      }
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn('cant update person', error);
    }
    utilityStore.turnOffWaiting();
  };
}

export default new PeopleStore();
