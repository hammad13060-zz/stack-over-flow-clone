Template.question_answers.onRendered(function(){
  Session.setDefault('sort_state', 'active');
});

Template.question_answers.helpers({

  answers: function(questionId){
    //fields: {_id: 1, answer: 1, userId: 1, username: 1, createdAt: 1}
    var sort_methods = {
      'active': {createdAt: -1},
      'oldest': {createdAt: 1},
      'votes': {createdAt: -1} //not final implementation
    }

    var sort_method = {sort: sort_methods[Session.get('sort_state')]}
    var data = Answers.find({questionId: questionId}, sort_method).fetch();
    console.log(data);
    return data;
  },

  makeActive: function(expectedState){
    return (Session.get('sort_state') === expectedState ? 'active' : '');
  }
});


Template.question_answers.events({
  'click #answer-section-logo ul li a': function(e, tpl){

    var state = tpl.$(e.currentTarget).data()['sort_type'];
    Session.set('sort_state', state);
  }
});
