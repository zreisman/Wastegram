Wastegram.Views.UserSearch = Backbone.CompositeView.extend({
  events: {
    'keyup .user-search-input': 'search',
    'focusout .user-search-input': 'clearSearch'
  },

  initialize: function() {
    this.collection = new Wastegram.Collections.Users();
    this._resultsView = new Wastegram.Views.SearchResults({ collection: this.collection });
    this.addSubview('.search-results', this._resultsView);
  },

  clearSearch: function() {
    console.log('clearing!');
    var that = this;
    setTimeout(that._resultsView.clearSearch.bind(that._resultsView), 50);
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
