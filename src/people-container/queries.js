// @flow

export const FETCH_PEOPLE_QUERY = `query {
	listPersons {
        description
        title
        id
        githuburl
        linkedinurl
        location
        name
        picture
        skills {
        	id
        	name
        	level
        }
        startdate
    }
}`;

export const getCreatePersonQuery = (
  name: String,
  description: String,
  picture: String,
  startdate: Date,
  email: String,
  title: String,
  location: String,
  githuburl: String,
  linkedinurl: String
) => {
  return `mutation {
		createPerson(
			name: "${name}", description: "${description}", picture: "${picture}",
			startdate: "${startdate.getTime()}", email: "${email}", title: "${title}",
			location: "${location}", githuburl: "${githuburl}", linkedinurl: "${linkedinurl}"
		) {
			id
		}
	}`;
};

export const getUpdatePersonQuery = (
  name: String,
  description: String,
  picture: String,
  startdate: Date,
  email: String,
  title: String,
  location: String,
  githuburl: String,
  linkedinurl: String
) => {
  return `mutation {
		updatePerson(
			name: "${name}", description: "${description}", picture: "${picture}",
			startdate: "${startdate.getTime()}", email: "${email}", title: "${title}",
			location: "${location}", githuburl: "${githuburl}", linkedinurl: "${linkedinurl}"
		)
	}`;
};

export const getCreateSkillsQuery = (
  skills: [
    {
      level: Number,
      name: String
    }
  ]
) => {
  return `mutation {
		${skills.map(
    (
      skill,
      index
    ) => `skill${index}: createSkill(name: "${skill.name}", level: ${skill.level}) {
			id
		}\n`
  )}
	}`;
};

export const getAddSkillForPersonQuery = (
  personId: Number,
  skillsId: [Number]
) => {};
