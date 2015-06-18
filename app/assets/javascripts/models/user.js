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
    }.bind(this)
    });
  },

  destroyFollow: function () {
    this.follow().destroy({
      success: function (model) {
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
