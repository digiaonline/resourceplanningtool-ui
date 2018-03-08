// @flow

import {observable, action} from 'mobx';
import axios from 'axios';
import {
  FETCH_PEOPLE_QUERY,
  getCreatePersonQuery,
  getCreateSkillsQuery,
  getUpdatePersonQuery,
  getDeletePersonQuery,
  getAddSkillsForPersonQuery,
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
      console.log('cant fetch people', error);
    }
  };

  // pardon me this messy part, refactor later
  @action
  createPeople = async (personInfo: Object) => {
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
      const CREATE_SKILLS_QUERY = getCreateSkillsQuery(personInfo.skills);
      // wait to finish creating a person
      const createPersonResponse = await this.makeHttpRequest(
        CREATE_PERSON_QUERY
      );
      // wait to finish creating skills
      const createSkillsResponse = await this.makeHttpRequest(
        CREATE_SKILLS_QUERY
      );
      const ADD_SKILLS_FOR_PERSON_QUERY = getAddSkillsForPersonQuery(
        createPersonResponse.createPerson.id,
        Object.values(createSkillsResponse).map(
          skillResponse => +skillResponse.id
        )
      );
      // wait to finish adding skills created previously to created person
      const addSkillsResponse = await this.makeHttpRequest(
        ADD_SKILLS_FOR_PERSON_QUERY
      );
      // check if operation for adding skill to new person is successful
      if (Object.values(addSkillsResponse).find(response => response)) {
        alert('create person successfully');
        this.fetchPeople();
      }
    } catch (error) {
      console.log('cant create person', error);
    }
  };

  @action
  deletePerson = async (index: Number) => {
    try {
      const DELETE_PERSON_QUERY = getDeletePersonQuery(this.people[index].id);
      const response = await this.makeHttpRequest(DELETE_PERSON_QUERY);
      if (response.removePerson) {
        this.fetchPeople();
      }
    } catch (error) {
      console.log('cant delete person');
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

export default new PeopleStore();
