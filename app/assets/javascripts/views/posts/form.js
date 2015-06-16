Hastigram.Views.PostForm = Backbone.View.extend({
  template: JST['posts/form'],

  events: {
    'click .create-post': 'submit',
    'click .cloudinary-upload': 'imageUpload'
  },

  imageUpload: function() {
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result) {
        $('.post-form').append(
          "<input type='hidden' name='post[public_id]' value='" +
          result[0].public_id + "'>");
        $('.post-form').append(
          "<input type='hidden' name='post[format]' value='" +
          result[0].format + "'>");
        $('.post-form-cont').append(
          "<img src='" + result[0].thumbnail_url + "'>"
        );

    });
  },

  submit: function() {
    event.preventDefault();
    var formData = this.$('.post-form').serializeJSON();
    formData['post']['image_url'] = "http://res.cloudinary.com/dvd7awvbl/image/upload/w_600/" + formData['post']['public_id'] + "." + formData['post']['format']
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
