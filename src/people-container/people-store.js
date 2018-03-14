// @flow

import {observable, action} from 'mobx';
import axios from 'axios';
import {FETCH_PEOPLE_QUERY, getCreatePersonQuery} from './queries';

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
      await this.makeHttpRequest(CREATE_PERSON_QUERY);
      alert('create person successfully');
      this.fetchPeople();
    } catch (error) {
      console.log('cant create person', error);
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
      return [];
    }
  };
}

export default new PeopleStore();
