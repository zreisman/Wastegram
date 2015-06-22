Wastegram.Views.Compose = Backbone.View.extend({
  template: JST['posts/form'],

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});
