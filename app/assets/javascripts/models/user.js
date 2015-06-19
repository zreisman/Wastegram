Wastegram.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  follow: function () {
    if (!this._follow) {
      this._follow = new Wastegram.Models.Follow();
    }
    return this._follow;
  },

  createFollow: function () {
    this.follow().set('followed_id', this.id);
    this.follow().save({}, {
      success: function () {
        Wastegram.posts.fetch();
    }.bind(this)
    });
  },

  destroyFollow: function () {
    var user = this;
    this.follow().destroy({
      success: function (model) {
        _.each(Wastegram.posts.where({author_id: this.id }), function(post) {
          Wastegram.posts.remove(post);
        });
        // remove all posts with author_id that matches
        model.unset("id");
      }.bind(this)
    });
  },

  parse: function (response) {

    if (response.follow) {
      this.follow().set('id', response.follow);
      delete response.follow;
    }
    return response;
  }
});
