// @flow

export const getDeleteProjectQuery = (id: String) => {
  return `mutation {
	    removeProject(id: "${id}")
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

export const getAddPersonToProject = (projectId: String, personId: String) => {
  return `mutation {
    addPersonToProject(
      project_id: "${projectId}",
      project_id: "${personId}"
    ){project_id}
  }`;
};
