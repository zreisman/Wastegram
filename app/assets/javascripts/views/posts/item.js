Hastigram.Views.PostItem = Backbone.CompositeView.extend({
  template: JST['posts/item'],
  className: "post maxwidth",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    var posterId = this.model.get('author_id');
    var poster = this.model.users().get(posterId);
    var userTagView = new Hastigram.Views.UserTag({ model: poster });
    this.addSubview('.post-usertag', userTagView);
  },

  render: function() {
    this.$el.html( this.template({ post: this.model }) );
    this.attachSubviews();

    return this;
  }

});
