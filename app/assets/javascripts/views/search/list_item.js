Hastigram.Views.SearchListItem = Backbone.View.extend({
  className: 'search-result-item maxwidth',
  template: JST['search/list_item'],

  events: {
    'click .follow': 'toggleFollow'
  },

  initialize: function() {
    this.listenTo(this.model.follow(), 'sync change', this.render);
  },

  toggleFollow: function () {
    Hastigram.blocker = true;
    $('.user-search-input').focus();
    setTimeout(function() {
      Hastigram.blocker = false;
    }, 150);
    if (this.model.follow().isNew()) {
      this.model.createFollow();
    } else {
      this.model.destroyFollow();
    }
  },

  render: function() {

    this.$el.html(this.template({
      user: this.model,
      follow: this.model.follow()
    }));
    return this;
  }
});
