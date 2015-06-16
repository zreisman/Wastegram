Hastigram.Views.CommentItem = Backbone.View.extend({
  template: JST['comment/item'],

  // TODO: Maybe add `sync` listener

  render: function() {
    this.$el.html(this.template({ comment: this.model}));
    return this;
  }
});
