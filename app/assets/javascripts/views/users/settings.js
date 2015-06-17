Hastigram.Views.Settings = Backbone.View.extend({
  template: JST['user/settings'],

  events: {
    'click .upload-profile-pic': 'imageUpload'
  },

  imageUpload: function() {
    debugger;
    event.preventDefault();
    debugger;
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result) {
        $('.profile-form').append(
          "<input type='hidden' name='post[public_id]' value='" +
          result[0].public_id + "'>");
        $('.profile-form').append(
          "<input type='hidden' name='post[format]' value='" +
          result[0].format + "'>");
        $('.profile-img-preview').append(
          "<img src='" + result[0].thumbnail_url + "'>"
        );

    });
  },

  render: function() {
    this.$el.html(this.template({user: this.model }));
    return this;
  }

});
