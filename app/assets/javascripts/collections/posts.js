Wastegram.Collections.Posts = Backbone.Collection.extend({
  url: '/api/posts',
  model: Wastegram.Models.Post,

  comparator: function(post) {
    return post.get('created_at');
  },

  getOrFetch: function (id) {
      var post = this.get(id),
        posts = this;
      if(!post) {
        post = new Wastegram.Models.Post({ id: id });
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

Wastegram.posts = new Wastegram.Collections.Posts();
