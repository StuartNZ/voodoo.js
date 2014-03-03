// ----------------------------------------------------------------------------
// File: Light.js
//
// Copyright (c) 2014 Voodoojs Authors
// ----------------------------------------------------------------------------



/**
 * Base light view that others lights implement.
 *
 * This should NOT be created directly.
 *
 * @constructor
 * @private
 * @extends {voodoo.View}
 */
var LightView_ = voodoo.View.extend({

  createLight: function() {
    throw 'createLight_() undefined.';
  },

  load: function() {
    this.light = this.createLight();
    this.scene.add(this.light);
  },

  setColor: function(color) {
    this.light.color.copy(color);
  }

});



/**
 * Base light that derived lights implement.
 *
 * This should NOT be instantiated directly.
 *
 * @constructor
 * @private
 * @extends {voodoo.Model}
 *
 * @param {{color: string}=} opt_options Options object.
 */
var Light_ = voodoo.Model.extend({

  stencilViewType: NullView,

  initialize: function(options) {
    if (typeof options.color !== 'undefined')
      this.color_ = options.color;
    else this.color_ = null;

    // Create the color property
    Object.defineProperty(this, 'color', {
      get: function() { return this.color_; },
      set: function(color) {
        var threeJsColor = voodoo.utility.convertCssColorToThreeJsColor(color);
        this.view.setColor(threeJsColor);
        this.color_ = color;
      },
      writeable: true
    });
  },

  setUpViews: function() {
    this.color = this.color_ ? this.color_ : 'white';
  }

});


/**
 * CSS color string for this light.
 *
 * @type {string}
 */
Light_.prototype.color = '';