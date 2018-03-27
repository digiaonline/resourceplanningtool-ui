// @flow

import validatorjs from 'validatorjs';
import peopleStore from '../people-container/people-store';
import {filterArray} from '../utils';

export const plugins = {
  dvr: validatorjs,
};

export const hooks = {
  onSuccess(form: Object) {
    const initialsValue = form.initials();
    const skillsChanged = filterArray(
      initialsValue.skills,
      form.values().skills
    );
    const filteredValues = Object.assign({}, form.values(), {
      removedSkills: skillsChanged.removedItems,
      addedSkills: skillsChanged.addedItems,
    });
    console.log(filteredValues);
    if (initialsValue.name === '') {
      peopleStore.createPerson(filteredValues);
    } else {
      peopleStore.updatePerson(filteredValues);
    }
  },
};

export const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'name here',
    rules: 'required|string|between:1,25',
  },
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'title here',
    rules: 'required|string|between:1,25',
  },
  {
    name: 'location',
    label: 'Location',
    type: 'text',
    placeholder: 'location here',
    rules: 'required|string|between:1,25',
  },
  {
    name: 'linkedinurl',
    label: 'LinkedIn',
    type: 'url',
    placeholder: 'link to LinkedIn here',
    rules: 'url',
  },
  {
    name: 'githuburl',
    label: 'Github',
    type: 'url',
    placeholder: 'link to Github here',
    rules: 'url',
  },
  {
    name: 'startdate',
    label: 'Started in Digia',
    type: 'month',
    placeholder: 'startdate here',
    rules: 'required|date',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'description here',
    rules: 'required|string',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'email here',
    rules: 'required|email',
  },
  {
    name: 'new-skill-name',
    label: 'Technology',
    type: 'text',
    placeholder: 'enter new skill here',
    rules: 'string',
  },
  {
    name: 'new-skill-level',
    label: 'Skill level',
    type: 'number',
    rules: 'integer',
  },
  {
    name: 'skills',
    label: 'Skill list',
    value: [],
  },
  {
    name: 'id',
    label: 'id',
  },
];
