Hastigram.Views.UserSearch = Backbone.CompositeView.extend({
  events: {
    'keyup .user-search-input': 'search',
    'click .follow': 'follow'
    // 'focusout .user-search-input': 'clearSearch'
  },

  initialize: function() {
    this.collection = new Hastigram.Collections.Users();
    var resultsView = new Hastigram.Views.SearchResults({ collection: this.collection });
    globe = resultsView;
    $('.search-results').html(globe.$el);
    this.addSubview('.search-results', resultsView);
  },



  clearSearch: function() {
    $('.search-results').html('');
  },

  follow: function() {
    payLoad = {};
    payLoad.followid = $(event.target).data('user-id');
    var that = this;
    $.ajax({
        url : "/api/follows",
        type: "POST",
        data : payLoad,
        success: function(data, textStatus, jqXHR) {
          that.clearSearch();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          //  debugger;
        }
    });
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
