Hastigram.Views.Navbar = Backbone.View.extend({

  events: {
    'keyup .user-search-input': 'search',
    'focusout .user-search-input': 'clearSearch'

  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  clearSearch: function() {
    $('.search-results').html('');
  },

  search: function() {
    var searchCrit = $('.user-search-form').serializeJSON();
    if (searchCrit === "") {
      searchCrit = "_";
    }
    $.ajax({
        url : "/api/usersearch",
        type: "POST",
        data : searchCrit,
        success: function(data, textStatus, jqXHR) {
          var $results = $('.search-results');
          $results.html('');
          for(var i = 0; i < data.length; i++) {
            $results.append($('<div>')
              .addClass('search-result-item')
              .html(data[i].username));
          }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          //  debugger;
        }
    });
  },

  template: JST['navbar']
});
