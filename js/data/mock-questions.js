const images = [
  {
    url: `http://placehold.it/100x200`,
    width: 100,
    height: 200,
    isPhoto: true,
  },

  {
    url: `http://placehold.it/1000x800`,
    width: 200,
    height: 300,
    isPhoto: true,
  },

  {
    url: `http://placehold.it/800x600`,
    width: 800,
    height: 600,
    isPhoto: false,
  },

  {
    url: `http://placehold.it/1000x1200`,
    width: 1000,
    height: 1200,
    isPhoto: false,
  },
];

const questions = [
  [images[0]],
  [images[0], images[1]],
  [images[0], images[1], images[3]],
  [images[1]],
  [images[0], images[1], images[2]],
  [images[2]],
  [images[1], images[2]],
  [images[3]],
  [images[0], images[2], images[3]],
  [images[2], images[3]],
];

const getQuestions = (shoudNotBeShaffled) => {
  const sortFunction = shoudNotBeShaffled ?
    () => 1 :
    () => Math.random() - 0.5;
  return questions.sort(sortFunction);
};

export default getQuestions;
