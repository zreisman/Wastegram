Hastigram.Views.SearchListItem = Backbone.View.extend({
  className: 'search-result-item',
  template: JST['navbar/list_item'],

  render: function() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});
