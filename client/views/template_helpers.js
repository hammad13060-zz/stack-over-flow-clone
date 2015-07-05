Template.registerHelper('timePassed', function(referenceTime){
  return  moment(referenceTime).calendar();
});

Template.registerHelper('userIdData', function(){
  return {_id: this.userId};
});

Template.registerHelper('make_plural', function(string, count){
  return pluralize(string, count, true);
});
