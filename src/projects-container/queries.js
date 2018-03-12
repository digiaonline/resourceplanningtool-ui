// @flow

export const getDeleteProjectQuery = (id: String) => {
  return `mutation {
	    removeProject(id: "${id}")
	  }`;
};
