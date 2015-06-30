Template.layout.helpers({
  activeTab: function(state){
    return state === AccountsTemplates.getState() ? 'active' : '';
  }
});
