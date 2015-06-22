Wastegram.Views.NavbarComp = Backbone.CompositeView.extend({
  className: 'navbar-composite',

  events: {
    'click .nav-title': 'toMain',
    'click .compose': 'toCompose'
  },

  initialize: function() {
    var userSearchView = new Wastegram.Views.UserSearch();
    this.addSubview('.user-search', userSearchView);

    var profileButton = new Wastegram.Views.ProfileButton({model: this.model });
    this.addSubview('.profile', profileButton);
  },

  toCompose: function() {
    Backbone.history.navigate("#compose", {trigger: true});
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
