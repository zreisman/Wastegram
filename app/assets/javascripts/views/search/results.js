Wastegram.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST['search/result_list'],

  events: {
    'click .search-result-list': 'blocker',
    'mousedown .search-result-list *': 'blocker'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addResult);
    this.listenTo(this.collection, 'reset', this.resetEverything);
  },

  addResult: function(model) {
    var resultView = new Wastegram.Views.SearchListItem({ model: model });
    this.addSubview('.search-result-list', resultView);
  },

  addResults: function() {
    var that = this;
    this.collection.each(function(result) {
      var resultView = new Wastegram.Views.SearchListItem({ model: result });
      that.addSubview('.search-result-list', resultView);
    });
  },

  blocker: function () {
    Wastegram.blocker = true;
    $('.user-search-input').focus();
    setTimeout(function() {
      Wastegram.blocker = false;
    }, 150);
  },

  clearSearch: function() {
    if(Wastegram.blocker !== true) {
      this.eachSubview(function (subview) {
        subview.remove();
      });
    }
  },

  resetEverything: function() {
    this.eachSubview(function (subview) {
      subview.remove();
    });
    this._subviews = {};
    this.addResults();
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  }
});
