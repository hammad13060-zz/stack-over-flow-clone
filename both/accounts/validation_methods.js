//validation methods to be run on server side
//use Meteor.call method to run validations form client side
if (Meteor.isServer){
    Meteor.methods({

        //checks the existence of a username in our database to prevent naming conflict
        "userExists": function(username){
            return !!Meteor.users.findOne({username: username});
        },

        //checks the existence of a email in our database to prevent duplicacy of emails
        'emailExists': function(email){
          return !!Meteor.users.findOne({email: email});
        }
    });
}
