Hastigram.Views.PostItem = Backbone.CompositeView.extend({
  template: JST['posts/item'],
  className: "post maxwidth",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    this.$el.html( this.template({ post: this.model }) );
    this.attachSubviews();

    return this;
  }

});
