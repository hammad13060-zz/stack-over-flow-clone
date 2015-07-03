Meteor.publish('userInfo', function(userId){
  return Meteor.users.find({_id: userId}, {fields: {_id: 1, username: 1, emails: 1}});
});
