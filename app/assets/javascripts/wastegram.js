window.Wastegram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Wastegram.current_user = new Wastegram.Models.User();
    Wastegram.current_user.fetch({
      url: "/api/usersearch",
      type: "GET"
    });

    var $rootEl = $('#content');
    new Wastegram.Routers.Router({ $rootEl: $rootEl });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Wastegram.initialize();
});
