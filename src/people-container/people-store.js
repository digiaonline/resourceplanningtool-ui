// @flow

import {observable, action} from 'mobx';
import axios from 'axios';
import skillsStore from './skills-store';
import {isEmpty} from '../utils';
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
  people: [
    {
      name: String,
      description: String,
      id: String,
      githuburl: String,
      linkedinurl: String,
      email: String,
      picture: String,
      location: String,
      startdate: Number,
      title: String,
      skills: {
        level: Number,
        name: String
      }
    }
  ] = [];

  @action
  fetchPeople = async () => {
    try {
      const responseData = await this.makeHttpRequest(FETCH_PEOPLE_QUERY);
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
      const CREATE_PERSON_QUERY = getCreatePersonQuery(
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
      let createSkillsResponse, addSkillsResponse;
      // wait to finish creating a person
      const createPersonResponse = await this.makeHttpRequest(
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
          Object.values(createSkillsResponse).map(
            skillResponse => +skillResponse.id
          )
        );
      }
      if (createPersonResponse.createPerson) {
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
  deletePerson = async (index: Number) => {
    try {
      const DELETE_PERSON_QUERY = getDeletePersonQuery(this.people[index].id);
      const response = await this.makeHttpRequest(DELETE_PERSON_QUERY);
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
      let createSkillsResponse = {};
      let updateSkillsResponse;
      const updatePersonResponse = await this.makeHttpRequest(
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
      if (updatePersonResponse.updatePerson) {
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

  @action
  makeHttpRequest = async (queryString: String) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API,
        queryString,
        {
          headers: {
            'Content-Type': 'application/graphql',
          },
        }
      );
      return response.data.data;
    } catch (error) {
      // TODO: proper notification to be implemented
      console.warn(error);
    }
  };
}

export default new PeopleStore();
