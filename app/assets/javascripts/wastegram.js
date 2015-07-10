window.Wastegram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    // $(window).scroll(function() {
    //   Wastegram.scrollEffect();
    // });

    Wastegram.current_user = new Wastegram.Models.User();
    Wastegram.current_user.fetch({
      url: "/api/usersearch",
      type: "GET"
    });

    var $rootEl = $('#content');
    new Wastegram.Routers.Router({ $rootEl: $rootEl });

    Backbone.history.start();
  },

  scrollEffect: function() {
    var top = $(window).scrollTop();
    var postPos = $('.scroll-post').position();
    var postHeight = $('.scroll-post').height();
    if (postPos) {
      var postTop = postPos.top;
      var max = $('.scroll-post .waypoint-bottom').position().top - 140;
      var diff = (top - postTop) -30;
      if (diff > max) {
        diff = max;
      } else if (diff < 0) {
        diff = 0;
      }
      var newVal = "" + diff + 'px';
      $('.scroll-effect').css('top', newVal);
    }
  }
};

$(document).ready(function(){
  Wastegram.initialize();
});

$(window).load(function(){
  Waypoint.refreshAll();
});
