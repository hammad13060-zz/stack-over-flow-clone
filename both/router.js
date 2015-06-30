Router.configure({
  layoutTemplate: 'layout'
});


//root route
//will display all the question (log in not required)
Router.route('/', function(){
  this.render('questions');
});


//setting up routing information for signIn template
AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    template: 'accounts-form',
    redirect: function(){
      console.log(Meteor.userId());
      Router.go('/user/' + Meteor.userId());
    }
});


AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/register',
    template: 'accounts-form',
    redirect: function(){
      console.log(Meteor.userId());
      Router.go('/user/' + Meteor.userId());
    }
});


//setting up a user resource route
Router.route('/user/:_id', {

  name: 'user.show',
  path: '/user/:_id',

  onBeforeAction: function () {this.next();},

  data: function(){
    return Meteor.users.findOne({_id: Meteor.userId()});
  },

  action: function(){
    this.render('user');
  }
});

