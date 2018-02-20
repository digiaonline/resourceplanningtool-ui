const dummyPerson = {
  id: 1,
  imageUrl: 'https://goo.gl/images/3HJYGU',
  name: 'Erik Kieslowski',
  title: 'Manager of communism',
  startTimeInDigia: Date.now(), // mm/yy
  location: 'October Revolution',
  githubLink: 'https://en.wikipedia.org/wiki/String_theory',
  linkedinLink: 'https://en.wikipedia.org/wiki/String_theory',
  description:
    'Harry Potter movies are better than books version, damn you Erik',
  technologies: [
    {
      id: 1,
      level: 3, // [1-3]
    },
    {
      id: 2,
      level: 1, // [1-3]
    },
    {
      id: 3,
      level: 2, // [1-3]
    },
  ],
};

// add multiple dummy person to make an array
function generateDummyPeople() {
  let dummyPeople = [];
  for (let i = 0; i <= 7; i++) {
    dummyPeople.push(
      Object.assign({}, dummyPerson, {
        id: dummyPerson.id + i,
      })
    );
  }
  return dummyPeople;
}

export default generateDummyPeople();
