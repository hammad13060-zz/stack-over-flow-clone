Meteor.publish('question_specific_answers', function(questionId){
  return Answers.find({questionId: questionId});
});
