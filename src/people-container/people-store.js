// @flow

import {observable, action} from 'mobx';
import alertify from 'alertify.js';
import skillsStore from './skills-store';
import {values} from 'lodash';
import {isEmpty, makeHttpRequest} from '../utils';
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
      alertify.error('Cannot fetch people');
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
      let createSkillsResponse: Object = {};
      let addSkillsResponse: Object = {};
      // wait to finish creating a person
      const createPersonResponse: Object = await makeHttpRequest(
        CREATE_PERSON_QUERY
      );
      if (personInfo.skills.length > 0) {
        // wait to finish creating skills
        createSkillsResponse = await skillsStore.createSkills(
          personInfo.skills
        );
        // wait to finish adding created skills to created person
        addSkillsResponse = await skillsStore.addSkillsForPerson(
          createPersonResponse.createPerson.id,
          values(createSkillsResponse).map(skillResponse => skillResponse.id)
        );
      }
      // check if all needed requests were successful
      if (
        createPersonResponse.createPerson &&
        values(addSkillsResponse).indexOf(false) <= -1
      ) {
        alertify.success('Create person successfully');
        this.fetchPeople();
      }
    } catch (error) {
      alertify.error('Cannot create person.');
      throw error;
    }
  };

  @action
  deletePerson = async (id: number) => {
    try {
      const DELETE_PERSON_QUERY = getDeletePersonQuery(id);
      const response = await makeHttpRequest(DELETE_PERSON_QUERY);
      if (response.removePerson) {
        alertify.success('Delete person successfully.');
        this.fetchPeople();
      }
    } catch (error) {
      alertify.error('Cannot delete person.');
      throw error;
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
          values(createSkillsResponse).map(skillResponse => +skillResponse.id)
        );
      }
      if (
        updatePersonResponse.updatePerson &&
        values(updateSkillsResponse).indexOf(false) <= -1
      ) {
        this.fetchPeople();
        alertify.success('Update person successfully');
      }
    } catch (error) {
      alertify.error('Cannot save changes made to person.');
      throw error;
    }
  };
}

export default new PeopleStore();
