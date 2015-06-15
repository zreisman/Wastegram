Hastigram.Views.FeedCompView = Backbone.CompositeView.extend({
  template: JST['posts/feed'],
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addPostSubview);
    this.listenTo(this.collection, 'sync add', this.render);

    this.collection.each(function(post) {
      this.addPostSubview(post);
    });
    this.model = new Hastigram.Models.Post();
    var formView = new Hastigram.Views.PostForm({ model: this.model });
    this.addSubview('.post-form-cont', formView );
    var navBarView = new Hastigram.Views.NavbarComp();
    this.addSubview('.navbar', navBarView);
  },

  events: {
    'click .submit-post': 'submit'
  },

  addPostSubview: function(post) {
    var postItem = new Hastigram.Views.PostItem({ model: post });
    this.addSubview(".feed-stream", postItem, true);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  }

});
