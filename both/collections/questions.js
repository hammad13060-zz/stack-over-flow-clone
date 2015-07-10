Questions = new Mongo.Collection('questions');


Meteor.methods({

  //called when we submit a form for new question
  //for security puprose
  insertQuestion: function(title, question){
    if (!this.userId) throw new Meteor.Error('logged-out',
                                                              'The user must be logged in to post a question');
    check(title, String);
    check(question, String);
    if (title.length === 0 || question.length === 0) throw new Meteor.Error('empty fileds', 'empty fields not allowed');

    var data = {
      title: title,
      question: question,
      userId: this.userId,
      username: Meteor.user().username,
      votes: 0,
      votedBy: []
    }

    Questions.insert(data, function(err, id){
      if (err) throw err;
      return id;
    });

    //returns id of the newly inserted question
    },

    questionVote: function(questionId, userId, value){

      var self = this;

      if (!this.userId) throw new Meteor.Error('logged-out',
                                                              'The user must be logged in to post a question');
      check(questionId, String);
      check(userId, String);
      check(value, Number);

      if (!(value === -1 || value === 1)) throw new Meteor.Error('invalid vote magnitude',
                                                                                              'question can be up/down voted by a magnitude of 1');

      //checking if user is logged in

      //checking for upvote as an invalid user
      if (this.userId !== userId) throw new Meteor.Error('invalid upvote', 'cannot perform upvote as a different user');


      var question = Questions.findOne({_id: questionId});
      if (question){

        //checking if user upvoting/downvoting is different than user who posted question
        if (question.userId === userId)
          throw new Meteor.Error('cannot upvote your own answer', 'cannot upvote your own answer');

      //checking if user has already upvoted the answer/question
        var updateData = null;
        var voteList = question.votedBy;
        var vote = _.find(voteList, function(vote){return vote.userId === self.userId;});
        if (vote === undefined){
          var voteMeta = {userId: userId, value: value};
          console.log(voteMeta);
          updateData = {$inc: {votes: value}, $push: {votedBy: voteMeta}};
        }
        else if (vote.value !== value){
          vote.value = value;
          updateData = {$inc: {votes: 2*value}, $set: {votedBy: voteList}};
        }
        else throw new Meteor.Error('invalid upvote', 'cannot upvote twice');

        Questions.update({_id: questionId}, updateData, function(err, count){
          if (err) throw err;
          return 'success';
        });
      }
      else throw new Meteor.Error('no record', 'no such question exist');

    }
  });
