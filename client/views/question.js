Template.question.events({

  //refactoring to be done
  'click .question-upvote-area .glyphicon-chevron-up': function(e, tpl){
    e.preventDefault
    if (Meteor.userId() === this.userId){

    }
    else {
      Meteor.call('questionVote', this._id, Meteor.userId(), 1, function(error){
        if (error) alert(error.reason);
      });
    }
  },

  'click .question-upvote-area .glyphicon-chevron-down': function(e, tpl){
    e.preventDefault
    if (Meteor.userId() === this.userId){

    }
    else {
      Meteor.call('questionVote', this._id, Meteor.userId(), -1, function(error){
        if (error) alert(error.reason);
      });
    }
  },

  'click .answer-upvote-area .glyphicon-chevron-up': function(e, tpl){
    e.preventDefault
    if (Meteor.userId() === this.userId){

    }
    else {
      Meteor.call('answerVote', this._id, Meteor.userId(), 1, function(error){
        if (error) alert(error.reason);
      });
    }
  },

  'click .answer-upvote-area .glyphicon-chevron-down': function(e, tpl){
    e.preventDefault
    if (Meteor.userId() === this.userId){

    }
    else {
      Meteor.call('answerVote', this._id, Meteor.userId(), -1, function(error){
        if (error) alert(error.reason);
      });
    }
  }

})
