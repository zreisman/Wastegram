Wastegram.Views.FeedCompView = Backbone.CompositeView.extend({
  template: JST['posts/feed'],
  initialize: function() {
    this.listenTo(this.collection, 'add', this.addPostSubview);
    this.listenTo(this.collection, 'remove', this.removeFeedItem);

    this.collection.each(function(post) {
      this.addPostSubview(post);
    }.bind(this));

    // this.model = new Wastegram.Models.Post();
    var formView = new Wastegram.Views.PostForm({ model: new Wastegram.Models.Post() });
    this.addSubview('.post-form-cont', formView );

    var navBarView = new Wastegram.Views.NavbarComp();
    this.addSubview('.navbar', navBarView);
  },

  events: {
    'click .submit-post': 'submit'
  },

  addPostSubview: function(post) {
    var postItem = new Wastegram.Views.PostItem({ model: post });
    this.addSubview(".feed-stream", postItem, true);
  },

  removeFeedItem: function(model, collection, options) {
    this.removeModelSubview('.feed-stream', model);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  }

});
