Hastigram.Views.PostForm = Backbone.View.extend({
  template: JST['posts/form'],

  events: {
    'click .create-post': 'submit',
  },



  submit: function() {
    event.preventDefault();
    var formData = this.$('.post-form').serializeJSON();
    var that = this;
    this.model.save(formData, {

      success: function() {
        Hastigram.posts.unshift(that.model);
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
