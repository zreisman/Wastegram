Wastegram.Views.PostItem = Backbone.CompositeView.extend({
  template: JST['posts/item'],
  className: "post maxwidth",

  events: {
    'submit .comment-form': 'postComment',
    'click .glyphicon-remove': 'deletePost',
    'scroll window': 'detectScroll'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.comments(), 'add', this.addComment);
    this.listenTo(this.model.comments(), 'sync', this.render);

    var posterId = this.model.get('author_id');
    var poster = this.model.users().get(posterId);
    this.poster = poster;
    var userTagView = new Wastegram.Views.UserTag({ model: poster });
    // TODO: use this.author() model, not this.users() association
    this.addSubview('.post-usertag', userTagView);

    var that = this;

    this.model.comments().each(this.addComment.bind(this));

    var likesView = new Wastegram.Views.Likes({
      model: this.model
    });
    this.addSubview('.post-likes', likesView);
  },

  addComment: function (comment) {
    var commentView = new Wastegram.Views.CommentItem({ model: comment });
    this.addSubview('.post-comments', commentView);
  },

  attachWaypoints: function() {
    var that = this;
    this.topWaypoint = new Waypoint({
      element: this.$el.find('.waypoint-top'),
      handler: function(direction) {
        var top = true;
        that.toggleScrollEffect(direction, top);
      },
      offset: 70
    });
    this.bottomWaypoint = new Waypoint({
      element: this.$el.find('.waypoint-bottom'),
      handler: function(direction) {
        var top = false;
        that.toggleScrollEffect(direction, top);
      },
      offset: 70
    });
  },

  toggleScrollEffect: function(direction, top) {

    if (top && direction === 'down') {
      this.$el.find('.post-usertag').addClass('scroll-effect');
      this.$el.addClass('scroll-post');
      // console.log('adding class' + direction);
    } else if (top && direction === 'up') {
      this.$el.find('.post-usertag').removeClass('scroll-effect');
      this.$el.removeClass('scroll-post');
      // console.log('removing class' + direction);
    } else if (!top && direction === 'down') {
      this.$el.find('.post-usertag').removeClass('scroll-effect');
      this.$el.removeClass('scroll-post');
      // console.log('removing class' + direction);
    } else if (!top && direction === 'up') {
      this.$el.find('.post-usertag').addClass('scroll-effect');
      this.$el.addClass('scroll-post');
      // console.log('adding class' + direction);
    }
  },

  confirmDelete: function() {

  },

  deletePost: function() {
    this.model.destroy();
  },

  detectScroll: function() {
    console.log("scrolling")
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

    this.attachWaypoints();
    this.attachSubviews();

    return this;
  }

});
