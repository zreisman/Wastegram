Wastegram.Views.ProfileButton = Backbone.View.extend({
  template: JST['navbar/profile_button'],

  render: function() {
    var fragment = Backbone.history.getFragment();
    this.$el.html(this.template({ fragment: fragment }));
    return this;
  }


});
