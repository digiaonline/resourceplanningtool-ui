const dummyPerson = {
  id: 0,
  picture:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpKwTLaDvE1Rk4SBVI9vfs0ODtWGEpoj-ws4B1AL7op_TB637zMw',
  name: 'Erik Kieslowski',
  title: 'Manager',
  startdate: Date.now(), // mm/yy
  location: 'October Revolution',
  githuburl: 'https://en.wikipedia.org/wiki/String_theory',
  linkedinurl: 'https://en.wikipedia.org/wiki/String_theory',
  description:
    'Harry Potter movies are better than books version, damn you Erik. Better than Lord Of The Rings also. Triggered ?.',
  skills: [
    {
      id: 1,
      name: 'Go',
      level: 3, // [1-3]
    },
    {
      id: 2,
      name: 'PHP',
      level: 1, // [1-3]
    },
    {
      id: 3,
      name: 'DevOps',
      level: 2, // [1-3]
    },
    {
      id: 3,
      name: 'Tensorflow',
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
