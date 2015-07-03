Template.post_answer.events({
  'submit form.answer-form': function(e, tpl){
    e.preventDefault();
    var answer = tpl.$('textarea').val().trim();
    if (answer.length > 0){
      var questionId = this._id;
      Meteor.call('insertAnswer', answer, questionId, function(error, answerId){
        if (error){
          alert(error.reason);
        }
        else{
          tpl.$('textarea').val('');
        }
      });
    }
    else{
      alert('empty answer');
    }
  }
});
