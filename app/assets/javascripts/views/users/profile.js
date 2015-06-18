Wastegram.Views.Profile = Backbone.CompositeView.extend({
  template: JST['user/profile'],

  initialize: function() {
    var navBarView = new Wastegram.Views.NavbarComp();
    this.addSubview('.navbar', navBarView);

    var settingsView = new Wastegram.Views.Settings({model: this.model });
    this.addSubview('.main', settingsView);
  },

  render: function() {
    this.$el.html(this.template());

    this.attachSubviews();
    return this;
  }

});
