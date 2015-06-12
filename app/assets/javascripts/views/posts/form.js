Hastigram.Views.PostForm = Backbone.View.extend({
  initialize: function(options) {
    this._backdrop = options.backdrop;
  },

  template: JST['posts/form'],

  className: 'm-content-col',

  events: {
    'click .create-post': 'submit',
    'click .close': 'close'
  },

  close: function() {
    this.remove();
    this._backdrop.remove();
  },

  submit: function() {
    event.preventDefault();
    var formData = this.$('.post-form').serializeJSON();
    var that = this;
    this.model.save(formData, {

      success: function() {
        Hastigram.posts.add(that.model);
        that.close();
      },
      error: function() {

      }
    });
  },


  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
