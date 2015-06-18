Wastegram.Views.PostForm = Backbone.View.extend({
  template: JST['posts/form'],

  initialize: function() {
    this.baseImageURL = "http://res.cloudinary.com/dvd7awvbl/image/upload/";
  },

  events: {
    'click .create-post': 'submit',
    'click .cloudinary-upload': 'imageUpload',
    'click .sepia': 'sepia',
    'click .grayscale': 'grayscale',
    'click .oilpaint': 'oilPaint',
    'click .saturate': 'saturate',
    'click .original': 'original'
  },

  imageUpload: function() {
    event.preventDefault();
    var that = this;
    cloudinary.openUploadWidget(CLOUDINARY_POST, function(error, result) {
        var image = result[0].public_id + "." + result[0].format;
        that.image = image;
        var imageURL = that.baseImageURL + "c_scale,w_600/" + image;

        var coords = result[0].coordinates.custom[0];
        $('.post-form').append(
          "<input type=\"hidden\" class=\"image-url\" name=\"post[image_url]\" value=\"" + imageURL + "\">");

        $('.filters').append("<button class=\"original btn btn-default\">Original</button>");
        $('.filters').append("<button class=\"sepia btn btn-default\">Sepia</button>");
        $('.filters').append("<button class=\"oilpaint btn btn-default\">Oil Paint</button>");
        $('.filters').append("<button class=\"saturate btn btn-default\">Saturate</button>");
        $('.filters').append("<button class=\"grayscale btn btn-default\">Grayscale</button>");

        $('.post-img-preview img').attr('src', imageURL);

    });
  },

  coordify: function(coords) {
    var lowLeft = "x_" + coords[0] + ",y_" + coords[1] + ",";
    var upRight = "x_" + coords[2] + ",y_" + coords[3] + ",";
    var crop = "c_crop";
    return lowLeft + upRight + crop;
  },

  submit: function() {
    event.preventDefault();
    var formData = this.$('.post-form').serializeJSON();
    var that = this;
    this.model.save(formData, {
      success: function() {
        Wastegram.posts.unshift(that.model);
        that.model.unset();
        that.render();
      },
      error: function() {

      }
    });
  },

  imageOptions: function(size, filter) {
    var effects = "c_fill" + ",w_" + size;
    if (filter) {
      return effects + "," + filter + "/";
    } else {
      return effects + "/";
    }
  },
  grayscale: function() {
    event.preventDefault();
    var newURL = this.baseImageURL + this.imageOptions(600, "e_grayscale") + this.image;
    $('.post-img-preview img').attr('src', newURL);
    $('.image-url').attr('value', newURL);
  },

  oilPaint: function() {
    event.preventDefault();
    var newURL = this.baseImageURL + this.imageOptions(600, "e_oil_paint") + this.image;
    $('.post-img-preview img').attr('src', newURL);
    $('.image-url').attr('value', newURL);
  },

  original: function() {
    event.preventDefault();
    var newURL = this.baseImageURL + this.imageOptions(600) + this.image;
    $('.post-img-preview img').attr('src', newURL);
    $('.image-url').attr('value', newURL);
  },

  saturate: function() {
    event.preventDefault();
    var newURL = this.baseImageURL + this.imageOptions(600, "e_saturation:70") + this.image;
    $('.post-img-preview img').attr('src', newURL);
    $('.image-url').attr('value', newURL);
  },

  sepia: function() {
    event.preventDefault();
    var newURL = this.baseImageURL + this.imageOptions(600, "e_sepia") + this.image;
    $('.post-img-preview img').attr('src', newURL);
    $('.image-url').attr('value', newURL);
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
