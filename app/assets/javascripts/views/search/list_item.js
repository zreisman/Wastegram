Hastigram.Views.SearchListItem = Backbone.View.extend({
  className: 'search-result-item maxwidth',
  template: JST['search/list_item'],

  events: {
    'click .follow': 'follow'
  },

  follow: function() {
    payLoad = {};
    payLoad.followid = this.model.id;
    this.$el.find('button').removeClass('btn-default');
    this.$el.find('button').addClass('btn-success');
    this.$el.find('button').text('Followed');
    $.ajax({
        url : "/api/follows",
        type: "POST",
        data : payLoad,
        success: function(data, textStatus, jqXHR) {

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          //  debugger;
        }
    });
  },

  render: function() {
    this.$el.html(this.template({ user: this.model }));
    return this;
  }
});
