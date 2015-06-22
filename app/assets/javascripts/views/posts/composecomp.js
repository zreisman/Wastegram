Wastegram.Views.ComposeView = Backbone.CompositeView.extend({
  template: JST['posts/compose'],

  initialize: function() {
    var composeView = new Wastegram.Views.PostForm({model: new Wastegram.Models.Post()});
    this.addSubview('.main', composeView);

    var navBarView = new Wastegram.Views.NavbarComp({ model: Wastegram.current_user });
    this.addSubview('.navbar', navBarView);
  },



  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

});
