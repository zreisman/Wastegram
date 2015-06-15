Hastigram.Views.SearchListItem = Backbone.View.extend({
  className: 'search-result-item maxwidth',
  template: JST['search/list_item'],

  render: function() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});
