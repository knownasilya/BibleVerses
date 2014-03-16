define(['backbone', 'handlebars', 'collections/verses-collection', 'views/verse-list-item-view', 'hbs!templates/verse-list'], function (Backbone, Handlebars, VersesCollection, VerseListItemView, template) {
  'use strict';

  return Backbone.View.extend({

    template: template,

    initialize: function() {

      this.list = this.model.attributes.list;
      this.verses = new VersesCollection;
      this.verses.fetch();

    },

    addOne: function(model) {

      var view = new VerseListItemView({ model: model });
      this.$('.verses').append(view.render().el);

    },

    addAll: function() {

      var verses = this.list ?
        this.verses.where({ list: this.list }) :
        this.verses.models;

      _.each(verses, this.addOne, this);

    },

    updateListNav: function() {

      var list = this.list;

      if (!list) {
        this.$('footer nav a:not([data-list])').addClass('active');
      }

      this.$('footer nav a').each(function(i, el) {
        var $el = $(el);
        if ($el.data('list') === list) {
          $el.addClass('active');
        }
      });

    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.addAll();
      this.updateListNav();

      return this;

    }

  });

});