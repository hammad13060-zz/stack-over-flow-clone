Template.question_form.events({
  'submit .ask-form': function(e, tpl){
    var error = [];
    e.preventDefault();
    var title = tpl.$('input#inputTitle').val().trim();
    var question = tpl.$('textarea.question-area').val().trim();
    Meteor.call('insertQuestion', title, question, function(error, questionId){
      if (error){
        alert(error.reason);
      }
      else{
        console.log('question inserted');
        Router.go('/question/' + questionId);
      }
    });
  }
});
