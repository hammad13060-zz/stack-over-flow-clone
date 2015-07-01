//router default configs
Router.configure({
  layoutTemplate: 'layout'
});


//root route
//will display all the question (log in not required)
Router.route('/', {

  name: 'show.questions',
  template: 'questions',

  subscriptions: function(){
    return Meteor.subscribe('allQuestions');
  },

  action: function(){
    if (this.ready()) {
      this.render('questions');
    } else {
      this.render('loading');
    }
  }

});


//setting up routing information for signIn template
AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    template: 'accounts_form',
    redirect: function(){
      console.log(Meteor.userId());
      Router.go('/user/' + Meteor.userId());
    }
});

//setting up routing information for signUp template
AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/register',
    template: 'accounts_form',
    redirect: function(){
      console.log(Meteor.userId());
      Router.go('/user/' + Meteor.userId());
    }
});


//setting up a user resource route
//for paths like domain.com/user/123xsjds4
Router.route('/user/:_id', {

  name: 'user.show',
  path: '/user/:_id',

  //context data containing user public info
  data: function(){
    var data = Meteor.users.findOne({_id: this.params._id});
    console.log(data);
    return data;
  },

  action: function(){
    this.render('user');
  }
});

//route for ask question page
Router.route('/ask', {
  name: 'ask.question',
  path: '/ask',
  template: 'question_form'
});

//setting up route for a question resource
//for paths like domain.com/question/123ashdaj
Router.route('/question/:_questionId', {
  name: 'show.question',
  path: '/question/:_questionId',
  template: 'question',
  subscriptions: function(){
    return Meteor.subscribe('question', this.params._questionId);
  },
  data: function(){
    return Questions.findOne({_id: this.params._questionId});
  },

  action: function(){
    if (this.ready()) {
      this.render('question');
    } else {
      this.render('loading');
    }
  }
});
