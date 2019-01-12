(function (ImageGrid,$,EventDispatcher) {



  ImageGrid.PlacingZone = function (width,height,orientation) {

    this.width= width;
    this.height = height;
    this.orientation = orientation;

    this.appendTo = function ($container) {

      this.$zone= $('<div class="placing-zone" style="height:'+height+'px; width:'+width+'px">'+orientation+'</div>').appendTo($container);
      if (this.orientation === 'L' || this.orientation === 'R') {
        this.$zone.addClass('placing-zone-vertical');
      }
      else {
        this.$zone.addClass('placing-zone-horizontal');
      }
    };




  }




  ImageGrid.PlacingZone.prototype = Object.create(EventDispatcher.prototype);
  ImageGrid.PlacingZone.prototype.constructor = ImageGrid.Fragment;


  return ImageGrid.PlacingZone;
})(H5P.ImageGrid,H5P.jQuery,H5P.EventDispatcher);
