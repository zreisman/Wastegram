Hastigram.Views.Navbar = Backbone.View.extend({

  events: {
    'keyup .user-search-input': 'search'
  },

  render: function() {
    this.$el.html(this.template());
    return this;
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
        success: function(data, textStatus, jqXHR)
        {
          var $list = $('<ul>');
          for(var i = 0; i < data.length; i++) {
            $list.append($('<li>').html(data[i].username));
          }
          $('.search-results').html($list);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          //  debugger;
        }
    });
  },

  template: JST['navbar']
});
