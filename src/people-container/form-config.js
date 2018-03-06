// @flow

import validatorjs from 'validatorjs';
import peopleStore from './people-store';

export const plugins = {
  dvr: validatorjs,
};

export const hooks = {
  onSuccess(form: Object) {
    // submit the form here
    console.log('form submitted (i lied)');
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
    placeholder: 'link to LinkedIn here',
    rules: 'required|date',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'link to LinkedIn here',
    rules: 'required|string',
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
    type: 'radio',
    rules: 'integer',
  },
  {
    name: 'skills',
    label: 'Skill list',
  },
];
