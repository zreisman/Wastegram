Wastegram.Views.BackDrop = Backbone.View.extend({
  template: JST['posts/backdrop'],

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});
