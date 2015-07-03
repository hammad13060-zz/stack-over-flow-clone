Template.question_answer.helpers({
  timePassed: function(referenceTime){
    return  moment(referenceTime).calendar();
  },
  userIdData: function(){
    return {_id: this.userId};
  }
});
