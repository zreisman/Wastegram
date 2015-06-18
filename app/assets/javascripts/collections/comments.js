Wastegram.Collections.Comments = Backbone.Collection.extend({
  url: '/api/comments',

  model: Wastegram.Models.Comment
});
