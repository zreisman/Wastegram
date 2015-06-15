Hastigram.Views.UserTag = Backbone.View.extend({
  template: JST['user/tag'],

  render: function() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }

});
