Hastigram.Views.FeedCompView = Backbone.CompositeView.extend({
  template: JST['posts/feed'],
  className: 'feed-container',
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addPostSubview);
    this.listenTo(this.collection, 'sync add', this.render);

    this.collection.each(function(post) {
      this.addPostSubview(post);
    });

  },

  addPostSubview: function(post) {
    var postItem = new Hastigram.Views.PostItem({ model: post });
    this.addSubview(".feed-stream", postItem);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  }

});
