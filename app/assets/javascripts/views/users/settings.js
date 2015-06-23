Wastegram.Views.Settings = Backbone.View.extend({
  template: JST['user/settings'],

  initialize: function() {
    this.baseImageURL = "http://res.cloudinary.com/dvd7awvbl/image/upload/";
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .upload-profile-pic': 'imageUpload',
    'click .sepia': 'sepia',
    'click .grayscale': 'grayscale',
    'click .oilpaint': 'oilPaint',
    'click .saturate': 'saturate',
    'click .original': 'original',
    'submit .profile-form': 'submit'
  },

  imageUpload: function() {
    event.preventDefault();
    var that = this;
    cloudinary.openUploadWidget(CLOUDINARY_PROFILE, function(error, result) {
        var image = result[0].public_id + "." + result[0].format;
        that.image = image;
        var imageURL = that.baseImageURL + "c_fill,h_300,w_300/" + image;

        $('.profile-form').append(
          "<input type='hidden' class='image-url' name='image_url' value='" + imageURL + "'>");

        $('.filters').append("<button class=\"original btn btn-default\">Original</button>");
        $('.filters').append("<button class=\"sepia btn btn-default\">Sepia</button>");
        $('.filters').append("<button class=\"oilpaint btn btn-default\">Oil Paint</button>");
        $('.filters').append("<button class=\"saturate btn btn-default\">Saturate</button>");
        $('.filters').append("<button class=\"grayscale btn btn-default\">Grayscale</button>");

        $('.profile-img-preview img').attr('src', imageURL);

    });
  },

  imageOptions: function(size, filter) {
    var effects = "c_fill,h_" + size + ",w_" + size;
    if (filter) {
      return effects + "," + filter + "/";
    } else {
      return effects + "/";
    }
  },
  grayscale: function() {
    event.preventDefault();
    $('#profile-spinner').addClass('spinner-loader');
    var newURL = this.baseImageURL + this.imageOptions(300, "e_grayscale") + this.image;
    $('.profile-img-preview img').attr('src', newURL).load(function() {
      $('#profile-spinner').removeClass('spinner-loader');
    });
    $('.image-url').attr('value', newURL);
  },

  oilPaint: function() {
    event.preventDefault();
    $('#profile-spinner').addClass('spinner-loader');
    var newURL = this.baseImageURL + this.imageOptions(300, "e_oil_paint") + this.image;
    $('.profile-img-preview img').attr('src', newURL).load(function() {
      $('#profile-spinner').removeClass('spinner-loader');
    });
    $('.image-url').attr('value', newURL);

  },

  original: function() {
    event.preventDefault();
    $('#profile-spinner').addClass('spinner-loader');
    var newURL = this.baseImageURL + this.imageOptions(300) + this.image;
    $('.profile-img-preview img').attr('src', newURL).load(function() {
      $('#profile-spinner').removeClass('spinner-loader');
    });
    $('.image-url').attr('value', newURL);
  },

  saturate: function() {
    event.preventDefault();
    $('#profile-spinner').addClass('spinner-loader');
    var newURL = this.baseImageURL + this.imageOptions(300, "e_saturation:70") + this.image;
    $('.profile-img-preview img').attr('src', newURL).load(function() {
      $('#profile-spinner').removeClass('spinner-loader');
    });
    $('.image-url').attr('value', newURL);
  },

  sepia: function() {
    event.preventDefault();
    $('#profile-spinner').addClass('spinner-loader');
    var newURL = this.baseImageURL + this.imageOptions(300, "e_sepia") + this.image;
    $('.profile-img-preview img').attr('src', newURL).load(function() {
      $('#profile-spinner').removeClass('spinner-loader');
    });
    $('.image-url').attr('value', newURL);
  },

  submit: function() {
    event.preventDefault();
    var profileAttributes = $(event.target).serializeJSON();
    urlFrags = profileAttributes.image_url.split('c_fill,h_300,w_300');
    profileAttributes.thumb_url = urlFrags.join('c_fill,h_100,w_100');
    Wastegram.current_user.set(profileAttributes, {merge: true});
    Wastegram.current_user.save({}, {
      success: function() {
        Backbone.history.navigate("", {trigger: true });
      }
    });

  },

  render: function() {
    this.$el.html(this.template({user: this.model }));
    return this;
  }

});
