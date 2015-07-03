Template.question_answers.helpers({
  answers: function(questionId){
    //fields: {_id: 1, answer: 1, userId: 1, username: 1, createdAt: 1}
    var data = Answers.find({questionId: questionId}, { sort: {createdAt: -1}}).fetch();
    console.log(data);
    return data;
  }
});
