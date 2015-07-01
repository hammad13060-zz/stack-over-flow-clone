Template.questions.helpers({
  allQuestions: function(){
    var cursor = Questions.find({},  {fields: {_id: 1, title: 1, createdAt: 1, username: 1, userId: 1}, sort: {createdAt: -1}});
    return cursor.fetch();
  }
});
