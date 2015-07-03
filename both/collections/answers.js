Answers = new Mongo.Collection('answers');


Meteor.methods({
  insertAnswer: function(answer, questionId){

    //check for argument type
    check(answer, String);
    check(questionId, String);

    //check for existence of question
    if (!Questions.findOne({_id: questionId})){
      throw new Meteor.Error('no such question', 'cannot answer a non existing question');
    }

    if (answer.length < 0){
      throw new Meteor.Error('empty answer field', 'answer field empty');
    }

    var data = {
      answer: answer,
      questionId: questionId,
      userId: this.userId,
      username: Meteor.user().username,
    };

    var answerId = Answers.insert(data);

    return answerId;
  }
});
