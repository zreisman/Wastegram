Wastegram.Views.ProfileButton = Backbone.View.extend({
  template: JST['navbar/profile_button'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var fragment = Backbone.history.getFragment();
    this.$el.html(this.template({ currentUser: this.model, fragment: fragment }));
    return this;
  }


});
