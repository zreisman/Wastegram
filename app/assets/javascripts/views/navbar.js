Hastigram.Views.Navbar = Backbone.View.extend({

  logOut: function() {

  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  template: JST['navbar']
});
