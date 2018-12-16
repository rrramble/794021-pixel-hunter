// Adapter

const adaptQuestion = (question) => {
  return question.answers.map((answer) => {
    return {
      height: answer.image.height,
      width: answer.image.width,
      url: answer.image.url,
      isPhoto: answer.type === `photo`,
    };
  });
};

export default class Adapter {

  static questions(data) {
    return data.map((question) => {
      return adaptQuestion(question);
    });
  }

}
