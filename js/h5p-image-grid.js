H5P.ImageGrid = (function ($) {

  /**
   * ImageGrid - Description
   *
   * @param {type} options Description
   * @param {type} id      Description
   * @param {type} extras  Description
   *
   * @returns {type} Description
   */
  // TODO : update documentation
  function ImageGrid(options,id) {

    this.options = $.extend(true,{
      levels: '3',
      chooseDifficulty: true,
      image: null
    },options);

    H5P.EventDispatcher.call(this);

    this.gridSrcImage = H5P.getPath(this.options.image.path,id);




  }

  ImageGrid.prototype = Object.create(H5P.EventDispatcher.prototype);
  ImageGrid.prototype.constructor = ImageGrid;
  // prototype functions will go here.

  ImageGrid.prototype.attach = function ($container) {
    $container.append("<h1>Hello World</h1>");
  };


  return ImageGrid;
})(H5P.jQuery);
