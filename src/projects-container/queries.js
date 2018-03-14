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

export const getUpdateProjectQuery = (
  id: Number,
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
    updateProject(id: ${+id}, picture: "${picture}", starttime: ${starttime}, endtime: ${endtime}, ongoing: ${ongoing}, shortdescription: "${shortdescription}",
                  liveat: "${liveat}", githuburl: "${githuburl}", name: "${name}", description: "${description}", contactemail: "${contactemail}")
  }`;
};

export const getAddPersonToProjectQuery = (
  projectId: Number,
  personId: Number
) => {
  return `mutation {
    addPersonToProject(
      project_id: ${projectId},
      person_id: ${personId}
    )
  }`;
};

export const getRemovePersonfromProjectQuery = (
  projectId: Number,
  personId: Number
) => {
  return `mutation {
    removePersonFromProject(
      project_id: ${projectId},
      person_id: ${personId}
    )
  }`;
};

export const getAddTechnologiesToProjectQuery = (
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

export const getRemoveTechnologiesFromProjectQuery = (
  projectId: Number,
  technologyId: Number
) => {
  return `mutation {
    removeTechnologyFromProject(
      project_id: ${projectId},
      technology_id: ${technologyId}
    )
  }`;
};

export const getAddProjectToCustomerQuery = (
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

export const getRemoveProjectFromCustomerQuery = (
  projectId: Number,
  customerId: Number
) => {
  return `mutation {
    removeProjectFromCustomer(
      project_id: ${projectId},
      customer_id: ${customerId}
    )
  }`;
};

export const getCreateNewsQuery = (url: String, description: String) => {
  return `mutation {
    createNews(
      url: "${url}",
      description: "${description}"
    ) {
      id
    }
  }`;
};

export const ALL_PROJECTS_QUERY = `query {
  listProjects {
    id
    name
    description
    githuburl
    liveat
    technologies {
      id
      name
    }
  }
}`;

export const PROJECT_QUERY = `{
    id
    name
    starttime
    endtime
    ongoing
    liveat
    githuburl
    shortdescription
    description
    contactemail
    customer {id}
    technologies {id name}
    persons {id name}
  }
}`;

export const TECHNOLOGIES_QUERY = `query {
  listTechnologies {
    id
    name
  }
}`;
