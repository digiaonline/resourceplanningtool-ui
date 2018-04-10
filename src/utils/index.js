// @flow
import Form from 'mobx-react-form';
import axios from 'axios';

export function parseDateTime(timeNumber: Number) {
  // convert epoch timestamp to miliseconds
  const date: Date = new Date(timeNumber * 1000);
  const month: Number = date.getMonth() + 1;
  const year: Number = date.getFullYear();
  return `${year}-${month >= 10 ? `${month}` : `0${month}`}`;
}

export function isEmpty(object: Object) {
  for (let key in object) {
    if (object.hasOwnProperty(key));
    return false;
  }
  return true;
}

// update predefined input fields with corresponding intial values
export function updateFieldsWithValues(fields: [Object], values: Object) {
  let fieldsWithValues = fields.map(field => {
    let value = values[field.name];
    if (field.type === 'month') {
      value = parseDateTime(value);
    }
    return Object.assign({}, field, {
      value: value,
    });
  });
  return fieldsWithValues;
}

// create a mobx-react-form with provided fields, plugins, hooks, and initial values
export function getForm(
  fields: [Object],
  plugins: Object,
  hooks: Object,
  values: Object
) {
  if (!isEmpty(values)) {
    const fieldsWithValues = updateFieldsWithValues(fields, values);
    const form = new Form({fields: fieldsWithValues}, {plugins, hooks});
    return form;
  } else {
    return new Form({fields}, {plugins, hooks});
  }
}

// function to identify what item was added, and what item was removed from an initial array
// after operations, for updating a list of skills of a person
export function filterArray(
  initialArray: [any],
  comparedArray: [any]
): {
  removedItems: [any],
  addedItems: [any]
} {
  const remainedItems = comparedArray
    .filter(item => item.id)
    .map(item => item.id);
  return {
    addedItems: comparedArray.filter(item => !item.hasOwnProperty('id')),
    removedItems: initialArray.filter(
      item => remainedItems.indexOf(item.id) === -1
    ),
  };
}

export function onChangeImage(event: Event, form: Object) {
  form.$('file').set('value', event.target.files[0]);
  const reader = new FileReader();
  reader.onload = e => {
    this.previewImage = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

export async function makeHttpRequest(queryString: String) {
  try {
    const response = await axios.post(process.env.REACT_APP_API, queryString, {
      headers: {
        'Content-Type': 'application/graphql',
      },
    });
    return response.data.data;
  } catch (error) {
    // TODO: proper notification to be implemented
    console.warn(error);
  }
}
