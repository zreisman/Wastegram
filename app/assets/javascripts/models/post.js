Hastigram.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  users: function () {
    if (!this._users) {
      this._users = new Hastigram.Collections.Users([], { post: this });
    }
    return this._users;
  },

  parse: function (response) {
    if (response.author) {
      this.users().set(response.author);
      delete response.author;
    }
    return response;
  }
});
