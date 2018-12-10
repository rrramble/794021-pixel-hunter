const images = [
  {
    url: `http://placehold.it/${468 * 2}x${458 * 2}`,
    width: 468 * 2,
    height: 458 * 2,
    isPhoto: true,
  },

  {
    url: `http://placehold.it/${705 * 2}x${455 * 2}`,
    width: 705 * 2,
    height: 455 * 2,
    isPhoto: true,
  },

  {
    url: `http://placehold.it/${705 * 3}x${455 * 3}`,
    width: 705 * 3,
    height: 455 * 3,
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
  /*
  [images[0], images[2]],
  [images[0], images[2]],
  [images[0], images[2]],
  [images[0], images[2]],
  [images[2], images[0]],
  [images[2], images[0]],
  [images[2], images[0]],
  [images[2], images[0]],
  [images[0], images[1]],
  [images[0], images[2]],
  [images[2], images[3]],
  [images[2], images[0]],
  */

  [images[0]],
  [images[0], images[1]],
  [images[0], images[1], images[3]],
  [images[1]],
  [images[0], images[1], images[2]],
  [images[2]],
  [images[1], images[2]],
  [images[3]],
  [images[3], images[0], images[1]],
  [images[2], images[3]],

  /*
  [images[0], images[2], images[3]],
  [images[0], images[2], images[3]],
  [images[0], images[2], images[3]],
  [images[0], images[2], images[3]],
  [images[0], images[2], images[3]],
  [images[0], images[2], images[3]],
  [images[0], images[2], images[3]],
  [images[0], images[2], images[3]],
  [images[0], images[2], images[3]],
  [images[0], images[2], images[3]],
  */
];

const getQuestions = (shoudNotBeShaffled) => {
  const sortFunction = shoudNotBeShaffled ?
    () => 1 :
    () => Math.random() - 0.5;
  return questions.sort(sortFunction);
};

export default getQuestions;
