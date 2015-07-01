Meteor.publish('allQuestions', function(){
  var cursor = Questions.find({}, {fields: {_id: 1, title: 1, createdAt: 1, username: 1, userId: 1}})
  return cursor;
});

Meteor.publish('question', function(questionId){
  return Questions.find({_id: questionId});
});
