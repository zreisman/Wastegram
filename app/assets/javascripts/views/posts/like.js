Hastigram.Views.Likes = Backbone.View.extend({
  template: JST['posts/likes'],

  events: {
    'click .like': 'likePost'
  },

  initialize: function(options) {
    this.post = options.post;
    this.listenTo(this.post.likes(), 'add remove', this.render);
  },

  likePost: function() {
    event.preventDefault();
    var that = this;
    var newLike = new Hastigram.Models.Like();
    newLike.set({ post_id: this.post.id });
    if (this.post.like == null) {
      newLike.save({}, {
        success: function() {
          that.post.likes().add(newLike, { merge: true });
          that.post.like = true;
        }
      });
    } else {
      // var liker = this.post.likers().get(this.post.get('like'));
      debugger;
      newLike.destroy();
      this.post.like = null;
    }
  },

  render: function() {
    this.$el.html(this.template({ likers: this.collection, total: this.model }));

    return this;
  }
});
