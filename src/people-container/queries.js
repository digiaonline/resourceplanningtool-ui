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
				email
        picture
        skills {
        	id
        	name
        	level
        }
        startdate
    }
}`;

export const FETCH_SKILLS_QUERY = `query {
	listSkills {
		id
		name
		level
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
			startdate: ${new Date(startdate).getTime() /
        1000}, email: "${email}", title: "${title}",
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
  linkedinurl: String,
  id: Number
) => {
  return `mutation {
		updatePerson(
			name: "${name}", description: "${description}", picture: "${picture}",
			startdate: ${new Date(startdate).getTime() /
        1000}, email: "${email}", title: "${title}", id: ${id},
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

export const getAddSkillsForPersonQuery = (
  personId: Number,
  skillsId: [Number]
) => {
  return `mutation {
		${skillsId.map(
    (skillId, index) =>
      `addSkill${index}: addSkillForPerson(person_id: ${personId}, skill_id: ${skillId})`
  )}
	}`;
};

export const getRemoveSkillsForPersonQuery = (idsList: [Number]) => {
  return `mutation {
		${idsList.map(
    (id, index) => `remove${index}: removeSkillForPerson(id: ${id})`
  )}
	}`;
};

export const getDeletePersonQuery = (id: String) => {
  return `mutation {
	    removePerson(id: "${id}")
	  }`;
};

export const getUpdateSkillsForPersonQuery = (
  personId: Number,
  removedItemIds: [Number],
  addedItemIds: [Number]
) => {
  return `mutation {
		${removedItemIds.map(
    (id, index) =>
      `remove${index}: removeSkillForPerson(skill_id: ${id}, person_id: ${personId})`
  )}
		${addedItemIds.map(
    (id, index) =>
      `add${index}: addSkillForPerson(person_id: ${personId}, skill_id: ${id})`
  )}
	}`;
};
