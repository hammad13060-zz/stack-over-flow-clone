Template.layout.helpers({
  activeTab: function(state){
    return state === AccountsTemplates.getState() ? 'active' : '';
  }
});

Template.layout.events({
  'click .logout-button': function(e, tpl){
    e.preventDefault();
    Meteor.logout();
    Router.go('questions.show');
  }
});
