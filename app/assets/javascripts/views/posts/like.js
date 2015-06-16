Hastigram.Views.Likes = Backbone.View.extend({
  template: JST['posts/likes'],

  events: {
    'click .like': 'likePost'
  },

  initialize: function(options) {
    this.post = options.post;
    this.listenTo(this.post.likers(), 'add', this.render);
  },

  likePost: function() {
    var that = this;
    var newLike = new Hastigram.Models.Like();
    newLike.set({ post_id: this.post.id });
    newLike.save({}, {
      success: function() {
        that.post.likers().add(newLike, { merge: true });
      }
    });
  },

  render: function() {
    this.$el.html(this.template({ likes: this.collection, total: this.model }));

    return this;
  }
});
