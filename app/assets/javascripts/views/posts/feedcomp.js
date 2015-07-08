Wastegram.Views.FeedCompView = Backbone.CompositeView.extend({
  template: JST['posts/feed'],
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addPostSubview);
    this.listenTo(this.collection, 'remove', this.removeFeedItem);

    this.collection.each(function(post) {
      this.addPostSubview(post);
    }.bind(this));

    var navBarView = new Wastegram.Views.NavbarComp({ model: Wastegram.current_user });
    this.addSubview('.navbar', navBarView);
  },

  events: {
    'click .submit-post': 'submit'
  },

  addPostSubview: function(post) {
    var postItem = new Wastegram.Views.PostItem({ model: post });
    this.addSubview(".feed-stream", postItem, true);
    postItem.attachWaypoints();
  },

  removeFeedItem: function(model, collection, options) {
    this.removeModelSubview('.feed-stream', model);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    setTimeout(function() {
      Waypoint.refreshAll();
    });
    return this;
  }

});
