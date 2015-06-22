Wastegram.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "feed",
    "profile": "profile",
    "compose": "compose"
  },

  compose: function() {
    var composeView = new Wastegram.Views.ComposeView();
    this._swapView(composeView);
  },

  feed: function() {
    Wastegram.posts.fetch();
    var feedView = new Wastegram.Views.FeedCompView({ collection: Wastegram.posts });
    this._swapView(feedView);

  },

  profile: function() {
    var profileView = new Wastegram.Views.Profile({ model: Wastegram.current_user });
    this._swapView(profileView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
