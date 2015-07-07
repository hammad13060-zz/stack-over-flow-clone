//calculates time since submission for questions and answers
Template.registerHelper('timePassed', function(referenceTime){
  return  moment(referenceTime).calendar();
});


//return object to be used for generating link to user page
//used for questiions and answers submiitted by the user
Template.registerHelper('userIdData', function(){
  return {_id: this.userId};
});

Template.registerHelper('currentUserId', function(){
  return {_id: Meteor.userId()};
});

//for pluralizing
Template.registerHelper('make_plural', function(string, count){
  return pluralize(string, count, true);
});

//returns true if user is logged in otherwise false
Template.registerHelper('logged_in', function(){
  return !!Meteor.userId();
});
