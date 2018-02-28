(function(ImageGrid, Timer) {

  /**
   * Adapter between image sequencing and H5P.Timer
   *
   * @class H5P.ImageGrid.Timer
   * @extends H5P.Timer
   * @param {Element} element
   */
  ImageGrid.Timer = function(element) {
    /** @alias H5P.ImageGrid.Timer# */
    var self = this;
    // Initialize event inheritance
    Timer.call(self, 100);
    /** @private {string} */
    var naturalState = element.innerText;
    /**
     * Set up callback for time updates.
     * Formats time stamp for humans.
     *
     * @private
     */

    var update = function() {
      var time = self.getTime();

      var minutes = Timer.extractTimeElement(time, 'minutes');
      var seconds = Timer.extractTimeElement(time, 'seconds') % 60;
      if (seconds < 10) {
        seconds = '0' + seconds;
      }

      element.innerText = minutes + ':' + seconds;
    };

    // Setup default behavior
    self.notify('every_tenth_second', update);
    self.on('reset', function() {
      element.innerText = naturalState;
      self.notify('every_tenth_second', update);
    });
  };

  // Inheritance
  ImageGrid.Timer.prototype = Object.create(Timer.prototype);
  ImageGrid.Timer.prototype.constructor = ImageGrid.Timer;

})(H5P.ImageGrid, H5P.Timer);
