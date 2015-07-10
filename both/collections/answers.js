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
      votes: 0,
      votedBy: []
    };

    Answers.insert(data, function(err, id){
      if (err) throw err;
      return id;
    });
  },

  answerVote: function(answerId, userId, value){
      var self = this;

      //checking if user is logged in
      console.log(this.userId);
      if (this.userId == null) throw new Meteor.Error('logged-out',
                                                              'The user must be logged in to post a question');

      check(answerId, String);
      check(userId, String);
      check(value, Number);

      if (!(value === -1 || value === 1)) throw new Meteor.Error('invalid vote magnitude',
                                                                                              'question can be up/down voted by a magnitude of 1');

      //checking for upvote as an invalid user
      if (this.userId !== userId) throw new Meteor.Error('invalid upvote', 'cannot perform upvote as a different user');



      var answer = Answers.findOne({_id: answerId});
      //checking if answer with answerId exist in database
      if (answer){

        //checking if user upvoting/downvoting is different than user who posted answer/question
        if (answer.userId === this.userId)
          throw new Meteor.Error('cannot upvote your own answer/question', 'cannot upvote your own answer/question');

        //checking if user has already upvoted the answer/question
        var updateData = null;
        var voteList = answer.votedBy;
        var vote = _.find(voteList, function(vote){return vote.userId === self.userId;});
        if (vote === undefined){
          var voteMeta = {userId: this.userId, value: value};
          console.log(voteMeta);
          //Answers.update({_id: answerId}, {$push: {votedBy: voteMeta}});
          updateData = {$inc: {votes: value}, $push: {votedBy: voteMeta}};
        }
        else if (vote.value !== value){
          vote.value = value;
          //Answers.update({_id: answerId}, {$set: {votedBy: voteList}});
          updateData = {$inc: {votes: 2*value}, $set: {votedBy: voteList}};
        }
        else throw new Meteor.Error('invalid upvote', 'cannot upvote twice');



        Answers.update({_id: answerId}, updateData, function(err, id){
          if (err) throw err;
          return 'success';
        });
      }
      else throw new Meteor.Error('no record', 'no such question exist');
    }
});
