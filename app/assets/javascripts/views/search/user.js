Hastigram.Views.UserSearch = Backbone.CompositeView.extend({
  events: {
    'keyup .user-search-input': 'search'
    // 'focusout .user-search-input': 'clearSearch'
  },

  initialize: function() {
    this.collection = new Hastigram.Collections.Users();
    var resultsView = new Hastigram.Views.SearchResults({ collection: this.collection });
    this.addSubview('.search-results', resultsView);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  search: function() {
    var searchCrit = $('.user-search-form').serializeJSON();
    // this.clearSearch();

    var that = this;

    this.collection.reset();
    this.collection.fetch({
      url: "/api/usersearch",
      type: "POST",
      data: searchCrit,
      reset: true,
      success: function(collection, response, options) {
      },
      error: function() {
      }
    });

  },

  template: JST['search/form']

});
