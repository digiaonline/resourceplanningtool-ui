// @flow

export const getDeleteProjectQuery = (id: Number) => {
  return `mutation {
	    removeProject(id: ${id})
	  }`;
};

export const getCreateProjectQuery = (
  picture: String,
  starttime: Number,
  endtime: Number,
  ongoing: Boolean,
  liveat: String,
  githuburl: String,
  name: String,
  shortdescription: String,
  description: String,
  contactemail: String
) => {
  return `mutation {
    createProject(picture: "${picture}", starttime: ${starttime}, endtime: ${endtime}, ongoing: ${ongoing}, shortdescription: "${shortdescription}",
                  liveat: "${liveat}", githuburl: "${githuburl}", name: "${name}", description: "${description}", contactemail: "${contactemail}") {
      id
    }
  }`;
};

export const getAddPersonToProject = (projectId: Number, personId: Number) => {
  return `mutation {
    addPersonToProject(
      project_id: ${projectId},
      person_id: ${personId}
    )
  }`;
};

export const getAddTechnologiesToProject = (
  projectId: Number,
  technologyId: Number
) => {
  return `mutation {
    addTechnologyToProject(
      project_id: ${projectId},
      technology_id: ${technologyId}
    )
  }`;
};

export const getAddProjectToCustomer = (
  projectId: Number,
  customerId: Number
) => {
  return `mutation {
    addProjectToCustomer(
      project_id: ${projectId},
      customer_id: ${customerId}
    )
  }`;
};
