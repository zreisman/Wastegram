Hastigram.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "feed",
    "profile": "profile"
  },

  feed: function() {
    Hastigram.posts.fetch();
    var feedView = new Hastigram.Views.FeedCompView({ collection: Hastigram.posts });
    this._swapView(feedView);

  },

  profile: function() {
    var profileView = new Hastigram.Views.Profile({ model: Hastigram.current_user });
    this._swapView(profileView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
