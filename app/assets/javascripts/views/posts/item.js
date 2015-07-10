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
        // Wastegram.scrollEffect();
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

  imageLoad: function() {


  },

  toggleScrollEffect: function(direction, top) {
    var left = '';

    if (top && direction === 'down') {
      $tag = this.$el.find('.post-usertag');
      left = '' + $tag.offset().left + 'px';
      $tag.addClass('scroll-effect').css('top', '70px').css('left', left);
      this.$el.addClass('scroll-post');

    } else if (top && direction === 'up') {
      $tag = $('.scroll-effect');
      $tag.removeClass('scroll-effect').css('top', '0%').css('left', '-150px');
      this.$el.removeClass('scroll-post');

    } else if (!top && direction === 'down') {
      $tag = $('.scroll-effect');
      $tag.css('left', '-150px').css('top', 'calc(100% - 140px)');
      $tag.removeClass('scroll-effect');
      this.$el.removeClass('scroll-post');

    } else if (!top && direction === 'up') {
      $tag = this.$el.find('.post-usertag');
      left = '' + $tag.offset().left + 'px';
      $tag.addClass('scroll-effect').css('top', '70px').css('left', left);
      this.$el.addClass('scroll-post');
    }
  },

  confirmDelete: function() {

  },

  deletePost: function() {
    this.model.destroy();
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

    // this.attachWaypoints();
    this.attachSubviews();

    return this;
  }

});
