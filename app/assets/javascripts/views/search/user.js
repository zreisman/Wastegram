Hastigram.Views.UserSearch = Backbone.CompositeView.extend({
  events: {
    'keyup .user-search-input': 'search'
    // 'focusout .user-search-input': 'clearSearch'
  },

  initialize: function() {
    this.collection = new Hastigram.Collections.Users();
    this._resultsView = new Hastigram.Views.SearchResults({ collection: this.collection });
    this.addSubview('.search-results', this._resultsView);
  },

  clearSearch: function() {
    var that = this;
    setTimeout(that._resultsView.clearSearch.bind(that._resultsView), 2000);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  search: function() {
    var searchCrit = $('.user-search-form').serializeJSON();

    this.collection.reset();
    this.collection.fetch({
      url: "/api/usersearch",
      type: "POST",
      data: searchCrit,
      reset: true,
    });
  },

  template: JST['search/form']

});
