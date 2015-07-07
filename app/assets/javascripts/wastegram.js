window.Wastegram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    $(window).scroll(function() {
      var top = $(window).scrollTop();
      var postPos = $('.scroll-post').position();
      var postHeight = $('.scroll-post').innerHeight();
      if (postPos) {
        var postTop = postPos.top;
        console.log("post height is " + postHeight);
        var max = $('.scroll-post .waypoint-bottom').position().top - 140;
        var diff = top - postTop;
        if (diff > max) {
          diff = max;
        } else if (diff < 0) {
          diff = 0;
        }
        var newVal = "" + diff + 'px';
        $('.scroll-effect').css('top', newVal);
        console.log(newVal);
      }
      // console.log('top is ' + top)
      // console.log('post is ' + postPos)

    });

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
