Template.questions_title.helpers({
  timePassed: function(referenceTime){
    return  moment(referenceTime).calendar();
  },
  userIdData: function(){
    return {_id: this.userId};
  },
  questionIdData: function(){
    return {_questionId: this._id};
  }
});
