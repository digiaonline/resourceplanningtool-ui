// @flow
import Form from 'mobx-react-form';

export function parseDateTime(timeNumber: Number) {
  const date: Date = new Date(timeNumber);
  const month: Number = date.getMonth() + 1;
  const year: Number = date.getFullYear();
  return `${month >= 10 ? `${month}` : `0${month}`}/${year}`;
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
    return Object.assign({}, field, {
      value: values[field.name],
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
    console.log(form);
    return form;
  } else {
    return new Form({fields}, {plugins, hooks});
  }
}
