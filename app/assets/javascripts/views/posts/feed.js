Hastigram.Views.FeedView = Backbone.View.extend({
  className: 'feed-stream col-md-4 col-md-offset-4',

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    var that = this;
    this.collection.each(function(post) {
      var postItem = new Hastigram.Views.PostItem({ model: post });
      that.$el.append(postItem.render().$el);

    });
    // this.$el.html(this.template({ posts: this.collection }));
    return this;
  },

  template: JST['posts/feed']

});
