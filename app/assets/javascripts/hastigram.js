window.Hastigram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Hastigram.current_user = new Hastigram.Models.User();
    Hastigram.current_user.fetch({
      url: "/api/usersearch",
      type: "GET"
    });

    var $rootEl = $('#content');
    new Hastigram.Routers.Router({ $rootEl: $rootEl });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Hastigram.initialize();
});
