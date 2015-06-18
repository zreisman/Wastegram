Wastegram.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  users: function () { // TODO: remove if deprecated
    if (!this._users) {
      this._users = new Wastegram.Collections.Users([], { post: this });
    }
    return this._users;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new Wastegram.Collections.Comments([], { post: this });
    }
    return this._comments;
  },

  // likes: function () {
  //   if (!this._likes) {
  //     this._likes = new Wastegram.Collections.Likes([], { post: this });
  //   }
  //   return this._likes;
  // },

  parse: function (response) {
    if (response.author) {
      this.users().set(response.author); // TODO: change to a User model, not a collection
      delete response.author;
    }

    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }

    if (response.like) {
      this.like().set('id', response.like);
      delete response.like;
    }
    return response;
  },

  like: function () {
    if (!this._like) {
      this._like = new Wastegram.Models.Like();
    }
    return this._like;
  },

  createLike: function () {
    this.like().set('post_id', this.id);
    this.like().save({}, {
      success: function () {
        this.updateLikeCount(1);
      }.bind(this)
    });
  },

  destroyLike: function () {
    this.like().destroy({
      success: function (model) {
        model.unset("id");
        this.updateLikeCount(-1);
      }.bind(this)
    });
  },

  toggleLike: function () {
    if (this.like().isNew()) {
      this.createLike();
    } else {
      this.destroyLike();
    }
  },

  updateLikeCount: function (delta) {
    this.set("num_likes", this.get("num_likes") + delta);
  },


});
