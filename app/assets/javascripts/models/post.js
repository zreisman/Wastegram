Hastigram.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  users: function () {
    if (!this._users) {
      this._users = new Hastigram.Collections.Users([], { post: this });
    }
    return this._users;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new Hastigram.Collections.Comments([], { post: this });
    }
    return this._comments;
  },

  parse: function (response) {
    if (response.author) {
      this.users().set(response.author);
      delete response.author;
    }

    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }
    return response;
  }
});
