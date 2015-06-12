Hastigram.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "feed"
  },

  feed: function() {
    Hastigram.posts.fetch();
    var feedView = new Hastigram.Views.FeedCompView({ collection: Hastigram.posts });
    this._swapView(feedView);

  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
