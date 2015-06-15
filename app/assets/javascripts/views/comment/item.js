Hastigram.Views.CommentItem = Backbone.View.extend({
  template: JST['comment/item'],

  render: function() {
    this.$el.html(this.template({ comment: this.model}));
    return this;
  }
});
