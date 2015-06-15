Hastigram.Views.NavbarComp = Backbone.CompositeView.extend({

  initialize: function() {
    var userSearchView = new Hastigram.Views.UserSearch();
    this.addSubview('.user-search', userSearchView);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  template: JST['navbar/main']

});
