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
