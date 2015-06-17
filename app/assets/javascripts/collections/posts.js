Hastigram.Collections.Posts = Backbone.Collection.extend({
  url: '/api/posts',
  model: Hastigram.Models.Post,

  getOrFetch: function (id) {
      var post = this.get(id),
        posts = this;
      if(!post) {
        post = new Hastigram.Models.Post({ id: id });
        post.fetch({
          success: function () {
            posts.add(post);
          },
        });
      } else {
        post.fetch();
      }
      return post;
    }
});

Hastigram.posts = new Hastigram.Collections.Posts();
