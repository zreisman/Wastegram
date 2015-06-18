Wastegram.Views.NavbarComp = Backbone.CompositeView.extend({
  className: 'exclude',

  initialize: function() {
    var userSearchView = new Wastegram.Views.UserSearch();
    this.addSubview('.user-search', userSearchView);

    var profileButton = new Wastegram.Views.ProfileButton();
    this.addSubview('.profile', profileButton);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  template: JST['navbar/main']

});
