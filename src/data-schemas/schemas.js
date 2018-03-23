export const ProjectSchema = {
  id: Number,
  customerName: String,
  customerEmail: String,
  customerFeedbackIsDone: Boolean,
  isInCV: Boolean,
  name: String,
  subProjectName: String,
  startTime: Date, // mm/yy
  endTime: Date, // mm/yy
  isOnGoing: Boolean,
  isRetro: Boolean,
  projectManager: {
    id: Number,
  },
  shortDescription: String,
  longDescription: String,
  members: [
    {
      id: Number,
    },
  ],
  usedTechnologies: [
    {
      id: Number,
    },
  ],
  linkLive: String,
  linkGithub: String,
  otherLinks: [String],
};
export const CustomerSchema = {
  id: Number,
  name: String,
  industry: String,
  website: String,
};
export const Person = {
  id: Number,
  imageUrl: String,
  name: String,
  title: String,
  startTimeInDigia: Date, // mm/yy
  location: String,
  githubLink: String,
  linkedinLink: String,
  description: String,
  technologies: [
    {
      id: Number,
      level: Number, // [1-3]
    },
  ],
};
export const Technology = {
  id: Number,
  name: String,
};
