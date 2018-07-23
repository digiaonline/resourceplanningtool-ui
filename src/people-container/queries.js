// @flow

export const FETCH_PEOPLE_QUERY: string = `query {
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

export const FETCH_SKILLS_QUERY: string = `query {
	listSkills {
		id
		name
		level
	}
}`;

export const getCreatePersonQuery = (
  name: string,
  description: string,
  picture: string,
  startdate: Date,
  email: string,
  title: string,
  location: string,
  githuburl: string,
  linkedinurl: string
): string => {
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
  name: string,
  description: string,
  picture: string,
  startdate: Date,
  email: string,
  title: string,
  location: string,
  githuburl: string,
  linkedinurl: string,
  id: number
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
  skills: Array<{
    level: Number,
    name: string
  }>
): string => {
  return `mutation {
		${skills
    .map(
      (
        skill: Object,
        index: number
      ) => `skill${index}: createSkill(name: "${skill.name}", level: ${skill.level}) {
			id
		}\n`
    )
    .toString()}
	}`;
};

export const getAddSkillsForPersonQuery = (
  personId: number,
  skillsId: Array<number>
): string => {
  return `mutation {
		${skillsId
    .map(
      (skillId, index) =>
        `addSkill${index}: addSkillForPerson(person_id: ${personId}, skill_id: ${skillId})`
    )
    .toString()}
	}`;
};

export const getRemoveSkillsForPersonQuery = (idsList: Array<number>) => {
  return `mutation {
		${idsList
    .map((id, index) => `remove${index}: removeSkillForPerson(id: ${id})`)
    .toString()}
	}`;
};

export const getDeletePersonQuery = (id: number) => {
  return `mutation {
	    removePerson(id: "${id}")
	  }`;
};

export const getUpdateSkillsForPersonQuery = (
  personId: number,
  removedItemIds: Array<number>,
  addedItemIds: Array<number>
) => {
  return `mutation {
		${removedItemIds
    .map(
      (id: number, index) =>
        `remove${index}: removeSkillForPerson(skill_id: ${id}, person_id: ${personId})`
    )
    .toString()}
		${addedItemIds
    .map(
      (id, index) =>
        `add${index}: addSkillForPerson(person_id: ${personId}, skill_id: ${id})`
    )
    .toString()}
	}`;
};
