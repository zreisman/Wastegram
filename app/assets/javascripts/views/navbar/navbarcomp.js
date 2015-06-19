Wastegram.Views.NavbarComp = Backbone.CompositeView.extend({
  className: 'navbar-composite',

  events: {
    'click .nav-title': 'toMain'
  },

  initialize: function() {
    var userSearchView = new Wastegram.Views.UserSearch();
    this.addSubview('.user-search', userSearchView);

    var profileButton = new Wastegram.Views.ProfileButton({model: this.model });
    this.addSubview('.profile', profileButton);
  },

  toMain: function() {
    Backbone.history.navigate("#", {trigger: true});
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  template: JST['navbar/main']

});
