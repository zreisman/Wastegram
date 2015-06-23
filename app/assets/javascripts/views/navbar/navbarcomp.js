Wastegram.Views.NavbarComp = Backbone.CompositeView.extend({
  className: 'navbar-composite',

  events: {
    'click .nav-title': 'toMain',
    'click .home-link': 'toMain',
    'click .compose': 'toCompose',
    'mouseover .glyphicon-menu-hamburger': 'dropDown',
    'mouseleave .menu-items': 'closeDrop',
    'click .profile': 'toProfile',
    'click .logout': 'logOut'

  },

  initialize: function() {
    var userSearchView = new Wastegram.Views.UserSearch();
    this.addSubview('.user-search', userSearchView);

    // var profileButton = new Wastegram.Views.ProfileButton({model: this.model });
    // this.addSubview('.profile', profileButton);
  },

  closeDrop: function() {
    $('.menu-items').addClass('hide');
  },

  dropDown: function() {
    $('.menu-items').removeClass('hide');
  },

  logOut: function() {
    $.ajax({
      url: '/session',
      type: 'POST',
      data: { _method: 'delete'},
      success: function() {

        window.location.reload();
      }
    });
  },

  toCompose: function() {
    Backbone.history.navigate("#compose", {trigger: true});
  },

  toMain: function() {
    Backbone.history.navigate("#", {trigger: true});
  },

  toProfile: function() {
    Backbone.history.navigate("#profile", {trigger: true});
  },

  render: function() {
    var url = Backbone.history.getFragment();

    this.$el.html(this.template({url: url}));
    this.attachSubviews();

    return this;
  },

  template: JST['navbar/main']

});
