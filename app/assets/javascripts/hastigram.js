window.Hastigram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    new Hastigram.Routers.Router({ $rootEl: $rootEl });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Hastigram.initialize();
});
