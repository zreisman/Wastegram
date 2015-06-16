Hastigram.Views.Likes = Backbone.View.extend({
  template: JST['posts/likes'],

  events: {
    'click .like': 'toggleLike'
  },

  initialize: function(options) {
    this.listenTo(this.model, 'change:num_likes', this.render);
  },

  toggleLike: function (event) {
    event.preventDefault();
    this.model.toggleLike();
  },

  render: function() {
    this.$el.html(this.template({ num_likes: this.model.get("num_likes"),
                                  like: this.model.like() }));

    return this;
  }
});
