Hastigram.Collections.Posts = Backbone.Collection.extend({
  url: '/api/posts',
  model: Hastigram.Models.Post
});

Hastigram.posts = new Hastigram.Collections.Posts();
