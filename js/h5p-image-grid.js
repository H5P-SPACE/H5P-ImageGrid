H5P.ImageGrid = (function ($,UI) {

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
    this.gameMode = [getImageOrientation(this.options.image),getScreenOrientation()];
    this.gameLevel = parseInt(this.options.levels);
    this.registerDOMElements();

  }

  ImageGrid.prototype = Object.create(H5P.EventDispatcher.prototype);
  ImageGrid.prototype.constructor = ImageGrid;
  // prototype functions will go here.


  ImageGrid.prototype.registerDOMElements = function () {

    const that = this;

    this.$overlayContainer=$('<div class="overlay-container" >\
    <div class="overlay" ></div>\
    </div>');

    if (this.options.chooseDifficulty) {
      this.$difficultySelectContainer = $('<div class="difficulty-container"><div class="difficulty-label"> Difficulty</div>\
      <div  class="difficulty-selector"><select><option value="3">9 Pieces</option> \
      <option value="4">16 Pieces</option>\
      <option value="5">25 Pieces</option>\
      <option value="6">36 Pieces</option>\
      <option value="7">49 Pieces</option></select></div></div>');
    }

    this.$fullScreenCheckBox = $('<div class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span><label>Full Screen</label></div>');

    this.$startPuzzleButton = UI.createButton({
      title: 'Button',
      text: 'Start the puzzle',
      class: 'start-puzzle-button',
      click: function () {
        that.gotoPlayArea();
      }
      // TODO : semantics for this text
    });

    this.$difficultySelectContainer.on('change',function (e) {
      that.gameLevel = parseInt(e.target.value);
      that.fitGridPattern();
    });

    // play area elements

    this.$statusContainer = $('<div class="status-container"></div>');

    this.$timerContainer = $('<div class="timer-container"></div>');

    this.$timer = $('<div/>',{
      class: 'time-status',
      tabindex: 0,
      html: '<span role="term" ><i class="fa fa-clock-o" ></i>'
       +'</span >&nbsp;<span role="definition"  class="h5p-time-spent" >0:00</span>'
    });
    this.timer = new ImageGrid.Timer(this.$timer.find('.h5p-time-spent'));



    this.$buttonContainer = $('<div class="button-container"></div>');

    this.$shuffleButton = UI.createButton({
      title: 'Button',
      html: '<span><i class="fa fa-random" aria-hidden="true"></i></span>&nbsp;Shuffle Pieces',
      class:'status-button',
      click: function () {
        //TODO : functionality
      }
      // TODO : semantics for button text
    });

    this.$showSolutionButton = UI.createButton({
      title: 'Button',
      html: '<span><i class="fa fa-eye" aria-hidden="true"></i></span>&nbsp;Show Solution',
      class: 'status-button',
      click: function () {
        //TODO: add functionality
      }
      // TODO : semantics for button text
    });

    this.$playArea = $('<div class="playArea"></div>');



  };

  ImageGrid.prototype.gotoPlayArea = function () {
    this.$container.empty();
    this.$timer.appendTo(this.$statusContainer);

    this.$shuffleButton.appendTo(this.$buttonContainer);
    this.$showSolutionButton.appendTo(this.$buttonContainer);
    this.$buttonContainer.appendTo(this.$statusContainer);
    this.$statusContainer.appendTo(this.$container);
  };

  ImageGrid.prototype.fitGridPattern = function () {

    const $srcImage =  this.$initImageContainer.find('#srcImage');
    const $overlay = this.$initImageContainer.find('.overlay');
    const containerWidth = $overlay.width();
    const containerHeight = $overlay.height();
    const patternSplit = this.gameLevel/2;
    const aspRatio= this.options.image.width/this.options.image.height;

    const expHeight = containerWidth/aspRatio;
    const expWidth = containerHeight*aspRatio;

    let marginLeft = 0;
    let marginTop = 0;
    let patternSpreadHeight = 0;
    let patternSpreadWidth = 0;

    if (this.gameMode[0] === 'landscape') {
      if (expHeight < containerHeight) {
        marginLeft = ($srcImage.width() - containerWidth)/2;
        marginTop =  ($overlay.height()- expHeight)/2;
        patternSpreadWidth = $srcImage.width();
        patternSpreadHeight = expHeight;
      }
      else {
        marginLeft = ($overlay.width() - expWidth)/2;
        marginTop = ($srcImage.height() - containerHeight)/2;
        patternSpreadHeight = $srcImage.height();
        patternSpreadWidth = expWidth;

      }
    }
    else {
      if (expWidth < $overlay.width()) {
        marginLeft = ($overlay.width()- expWidth)/2;
        marginTop = ($srcImage.height() - containerHeight)/2;
        patternSpreadWidth = expWidth;
        patternSpreadHeight = $srcImage.height();
      }
      else {
        marginLeft = ($srcImage.width() - containerWidth) / 2;
        marginTop =  ($overlay.height() - expHeight) / 2;
        patternSpreadWidth = $srcImage.width();
        patternSpreadHeight = expHeight;
      }

    }

    $overlay.css({
      'margin-left': (marginLeft > 0)? marginLeft: 0,
      'margin-top': (marginTop > 0)? marginTop: 0,
      'background-size': patternSpreadWidth/patternSplit+'px '+patternSpreadHeight/patternSplit + 'px',
      'width': patternSpreadWidth,
      'height': patternSpreadHeight
    });



  };
  ImageGrid.prototype.attach = function ($container) {

    const that = this;

    $container.addClass('h5p-image-grid');
    this.$initImageContainer = $('<div class="init-image-container"><div class="bg-container"><img id="srcImage" src="'+this.gridSrcImage+'"</div></div>');
    this.$optionsContainer = $('<div class="options-container"></div>');



    if (this.$difficultySelectContainer) {
      this.$difficultySelectContainer.appendTo(this.$optionsContainer);
      this.$difficultySelectContainer.find('option[value='+this.gameLevel+']').attr('selected','selected');
    }
    this.$fullScreenCheckBox.appendTo(this.$optionsContainer);
    this.$startPuzzleButton.appendTo(this.$optionsContainer);


    this.$initImageContainer.appendTo($container);
    this.$optionsContainer.appendTo($container);

    this.$overlayContainer.find('.overlay').css({
      'width': that.$initImageContainer.find('#srcImage').width()+'px',
      'height': that.$initImageContainer.find('#srcImage').height()+'px'
    });

    this.$overlayContainer.appendTo(this.$initImageContainer);

    this.fitGridPattern();

    this.$container = $container;

    const delay = (function () {
      let timer = 0;
      return function (callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();

    this.on('resize',function () {
      delay(function () {
        that.$overlayContainer.find('.overlay').css({
          'width': that.$initImageContainer.find('#srcImage').width()+'px',
          'height': that.$initImageContainer.find('#srcImage').height()+'px'
        });
        that.fitGridPattern();
      }, 1000);

    });
  };

  const getContainerOrientation = function ($container) {
    return ($container.width() > $container.height())?'landscape':'portrait';
  }

  const getScreenOrientation = function () {
    return (window.matchMedia("(orientation: portrait)").matches)? 'portrait':'landscape';
  };

  const getImageOrientation = function (image) {
    return (image.width>=image.height)?'landscape':'portrait';

  }


  return ImageGrid;
})(H5P.jQuery,H5P.JoubelUI);
