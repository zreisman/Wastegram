Hastigram.Views.PostItem = Backbone.CompositeView.extend({
  template: JST['posts/item'],
  className: "post maxwidth",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    var posterId = this.model.get('author_id');
    var poster = this.model.users().get(posterId);
    var userTagView = new Hastigram.Views.UserTag({ model: poster });
    this.addSubview('.post-usertag', userTagView);
    var that = this;
    this.model.comments().each(function(comment) {
      var commentView = new Hastigram.Views.CommentItem({ model: comment });
      that.addSubview('.post-comments', commentView);
    });
  },

  render: function() {
    this.$el.html( this.template({ post: this.model }) );
    this.attachSubviews();

    return this;
  }

});
