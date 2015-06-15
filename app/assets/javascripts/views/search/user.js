Hastigram.Views.UserSearch = Backbone.CompositeView.extend({
  events: {
    'keyup .user-search-input': 'search',
    'click .follow': 'follow'
    // 'focusout .user-search-input': 'clearSearch'
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

    var that = this;
    $.ajax({
        url : "/api/usersearch",
        type: "POST",
        data : searchCrit,
        success: function(data, textStatus, jqXHR) {
          var $results = $('.search-results');
          $results.html('');
          for(var i = 0; i < data.length; i++) {
            var searchItem = new Hastigram.Views.SearchListItem({ model: data[i]});
            that.addSubview('.search-results', searchItem);
          }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          //  debugger;
        }
    });
  },

  template: JST['search/form']

});
