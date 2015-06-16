Hastigram.Views.PostItem = Backbone.CompositeView.extend({
  template: JST['posts/item'],
  className: "post maxwidth",

  events: {
    'submit .comment-form': 'postComment'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.comments(), 'add', this.render);
    var posterId = this.model.get('author_id');
    var poster = this.model.users().get(posterId);
    var userTagView = new Hastigram.Views.UserTag({ model: poster });
    this.addSubview('.post-usertag', userTagView);
    var that = this;
    this.model.comments().each(function(comment) {
      var commentView = new Hastigram.Views.CommentItem({ model: comment });
      that.addSubview('.post-comments', commentView);
    });

    var likesView = new Hastigram.Views.Likes({
      collection: this.model.likers(),
      model: this.model.likes,
      post: this.model
    });
    this.addSubview('.post-likes', likesView);
  },

  postComment: function() {
    event.preventDefault();
    var commentAttributes = $(event.target).serializeJSON();
    var that = this;
    commentAttributes.post_id = this.model.id;
    var newComment = new Hastigram.Models.Comment(commentAttributes);
    newComment.save({}, {
      success: function() {
        var commentView = new Hastigram.Views.CommentItem({ model: newComment });
        that.addSubview('.post-comments', commentView);
        that.model.comments().add(newComment, { merge: true });

      }
    });
  },

  render: function() {
    var user = this.model.users().get(this.model.get('author_id'));
    this.$el.html( this.template({ post: this.model, user: user }) );
    this.attachSubviews();

    return this;
  }

});
