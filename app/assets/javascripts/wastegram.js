window.Wastegram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    $(window).scroll(function() {
      // var top = $(window).scrollTop() + 70;
      // var postPos = $('.scroll-post').position().top;
      // console.log('top is ' + top)
      // console.log('post is ' + postPos)
      // var newVal = "" + (top - postPos) + 'px';
      // console.log(newVal);
      // $('.scroll-effect').css('top', newVal);

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
