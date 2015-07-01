Questions = new Mongo.Collection('questions');


Meteor.methods({

  //called when we submit a form for new question
  //for security puprose
  insertQuestion: function(title, question){
    if (!this.userId) throw new Meteor.Error('logged-out',
                                                              'The user must be logged in to post a question');
    check(title, String);
    check(question, String);
    if (title.length === 0 || question.length === 0) throw new Meteor.Error('empty fileds', 'empty fields not allowed');

    var data = {
      title: title,
      question: question,
      answers: [],
      userId: this.userId,
      username: Meteor.user().username
    }

    var questionId = Questions.insert(data);

    return questionId; //returns id of the newly inserted question
    }
  });
