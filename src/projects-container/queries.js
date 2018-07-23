// @flow
import {toString} from 'lodash';

export const getDeleteProjectQuery = (id: number): string => {
  return `mutation {
	    removeProject(id: ${id})
	  }`;
};

export const getCreateProjectQuery = (
  picture: string,
  starttime: number,
  endtime: number,
  ongoing: boolean,
  liveat: string,
  githuburl: string,
  name: string,
  shortdescription: string,
  description: string,
  contactemail: string
): string => {
  return `mutation {
    createProject(picture: "${picture}", starttime: ${starttime}, endtime: ${endtime}, ongoing: ${toString(
  ongoing
)}, shortdescription: "${shortdescription}",
                  liveat: "${liveat}", githuburl: "${githuburl}", name: "${name}", description: "${description}", contactemail: "${contactemail}") {
      id
    }
  }`;
};

export const getUpdateProjectQuery = (
  id: ?number,
  picture: string,
  starttime: number,
  endtime: number,
  ongoing: boolean,
  liveat: string,
  githuburl: string,
  name: string,
  shortdescription: string,
  description: string,
  contactemail: string
): string => {
  return `mutation {
    updateProject(id: ${+id}, picture: "${picture}", starttime: ${starttime}, endtime: ${endtime}, ongoing: ${toString(
  ongoing
)}, shortdescription: "${shortdescription}",
                  liveat: "${liveat}", githuburl: "${githuburl}", name: "${name}", description: "${description}", contactemail: "${contactemail}")
  }`;
};

export const getAddPersonToProjectQuery = (
  projectId: number,
  personId: number
): string => {
  return `mutation {
    addPersonToProject(
      project_id: ${projectId},
      person_id: ${personId}
    )
  }`;
};

export const getRemovePersonfromProjectQuery = (
  projectId: number,
  personId: number
): string => {
  return `mutation {
    removePersonFromProject(
      project_id: ${projectId},
      person_id: ${personId}
    )
  }`;
};

export const getAddTechnologiesToProjectQuery = (
  projectId: number,
  technologyId: number
): string => {
  return `mutation {
    addTechnologyToProject(
      project_id: ${projectId},
      technology_id: ${technologyId}
    )
  }`;
};

export const getRemoveTechnologiesFromProjectQuery = (
  projectId: number,
  technologyId: number
): string => {
  return `mutation {
    removeTechnologyFromProject(
      project_id: ${projectId},
      technology_id: ${technologyId}
    )
  }`;
};

export const getAddProjectToCustomerQuery = (
  projectId: number,
  customerId: number
): string => {
  return `mutation {
    addProjectToCustomer(
      project_id: ${projectId},
      customer_id: ${customerId}
    )
  }`;
};

export const getRemoveProjectFromCustomerQuery = (
  projectId: number,
  customerId: number
): string => {
  return `mutation {
    removeProjectFromCustomer(
      project_id: ${projectId},
      customer_id: ${customerId}
    )
  }`;
};

export const getAddNewsToProjectQuery = (
  project_id: number,
  news_id: number
): string => {
  return `mutation {
    addNewsToProject(
      project_id: ${project_id},
      news_id: ${news_id}
    )
  }`;
};

export const getRemoveNewsFromProjectQuery = (
  project_id: number,
  news_id: number
): string => {
  return `mutation {
    removeNewsFromProject(
      project_id: ${project_id},
      news_id: ${news_id}
    )
  }`;
};

export const getCreateNewsQuery = (
  url: string,
  description: string
): string => {
  return `mutation {
    createNews(
      url: "${url}",
      description: "${description}"
    ) {
      id
    }
  }`;
};

export const getCreateTechnologyQuery = (
  name: string,
  description: string
): string => {
  return `mutation {
    createTechnology(
      name: "${name}",
      description: "${description}"
    ) {
      id
    }
  }`;
};

export const getProjectQuery = (id: ?number): string => {
  return `query {
    project (id: ${toString(id)}) {
      id
      name
      picture
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
      news {id url description}
    }
  }`;
};

export const ALL_PROJECTS_QUERY: string = `query {
  listProjects {
    id
    picture
    name
    shortdescription
    githuburl
    liveat
    ongoing
    technologies {
      id
      name
    }
  }
}`;

export const TECHNOLOGIES_QUERY: string = `query {
  listTechnologies {
    id
    name
  }
}`;

export const ALL_NEWS_QUERY: string = `query {
  listNews {
    id
    url
    description
  }
}`;
