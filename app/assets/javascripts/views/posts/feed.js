Hastigram.Views.FeedView = Backbone.View.extend({
  className: 'feed-stream col-md-4 col-md-offset-4',

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  events: {
    'click .compose-post': 'compose'
  },

  compose: function() {
    var modalBackDrop = new Hastigram.Views.BackDrop();
    var post = new Hastigram.Models.Post();
    var formModal = new Hastigram.Views.PostForm({ model: post, backdrop: modalBackDrop});
    $('body').prepend(modalBackDrop.render().$el);
    $('body').prepend(formModal.render().$el);
  },

  render: function() {
    var that = this;
    this.$el.html(this.template());
    this.collection.each(function(post) {
      var postItem = new Hastigram.Views.PostItem({ model: post });
      that.$el.append(postItem.render().$el);

    });
    // this.$el.html(this.template({ posts: this.collection }));
    return this;
  },

  template: JST['posts/feed']

});
