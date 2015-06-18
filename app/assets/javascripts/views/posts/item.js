Wastegram.Views.PostItem = Backbone.CompositeView.extend({
  template: JST['posts/item'],
  className: "post maxwidth",

  events: {
    'submit .comment-form': 'postComment'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model.comments(), 'add', this.render);

    var posterId = this.model.get('author_id');
    var poster = this.model.users().get(posterId);
    var userTagView = new Wastegram.Views.UserTag({ model: poster });
    // TODO: use this.author() model, not this.users() association
    this.addSubview('.post-usertag', userTagView);

    var that = this;

    this.model.comments().each(this.addComment.bind(this));
    this.listenTo(this.model.comments(), 'add', this.addComment);

    var likesView = new Wastegram.Views.Likes({
      model: this.model
    });
    this.addSubview('.post-likes', likesView);
  },

  addComment: function (comment) {
    var commentView = new Wastegram.Views.CommentItem({ model: comment });
    this.addSubview('.post-comments', commentView);
  },

  postComment: function() {
    event.preventDefault();
    var commentAttributes = $(event.target).serializeJSON();
    var that = this;
    commentAttributes.post_id = this.model.id;
    var newComment = new Wastegram.Models.Comment(commentAttributes);
    newComment.save({}, {
      success: function() {
        // var commentView = new Wastegram.Views.CommentItem({ model: newComment });
        // that.addSubview('.post-comments', commentView);
        that.$(".comment-text-input").val("");
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
