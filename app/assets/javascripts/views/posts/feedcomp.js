Hastigram.Views.FeedCompView = Backbone.CompositeView.extend({
  template: JST['posts/feed'],
  className: 'feed-container',
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addPostSubview);
    this.listenTo(this.collection, 'sync add', this.render);

    this.collection.each(function(post) {
      this.addPostSubview(post);
    });
    this.model = new Hastigram.Models.Post();
    var formView = new Hastigram.Views.PostForm({ model: this.model });
    this.addSubview('.post-form', formView );
  },

  events: {
    'click .submit-post': 'submit'
  },

  addPostSubview: function(post) {
    var postItem = new Hastigram.Views.PostItem({ model: post });
    this.addSubview(".feed-stream", postItem, true);
  },

  // refreshFormSubview: function(post) {
  //   this.addSubview('.post-form', formView);
  // },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  }

});
