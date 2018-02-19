// H5P.ImageGrid = (function($,UI){
//
//         //declaration
//         var self = this;
//         var levelsNum;
//         var fragmentsToUse = [];
//
//         //constructor
//         function ImageGrid(params,id){
//
//                 self.params = params;
//
//                 self.id = id;
//                 levelsNum = self.params.levels;
//                 self.imageHeight=self.params.image.height;
//                 self.imageWidth=self.params.image.width;
//                 self.heightOfOnePiece=(self.params.image.height / self.params.levels);
//                 self.widthOfOnePiece=(self.params.image.width / self.params.levels);
//
//                 //get fragments to use
//                 var getFragments = function() {
//                     console.log("working");
//                     console.log(levelsNum);
//                     console.log(heightOfOnePiece);
//                     console.log(widthOfOnePiece);
//
//                     for(var i=0;i<levelsNum; i++)
//                     {
//                           for(var j=0;j<levelsNum;j++)
//                           {
//                               var fragmentId = i*levelsNum + j;
//                               var changeInHeight = i*self.heightOfOnePiece;
//                               var changeInWidth = j*self.widthOfOnePiece;
//                               var fragment = new ImageGrid.Fragments(self.params.image,self.id,self.heightOfOnePiece,self.widthOfOnePiece,changeInHeight,changeInWidth,fragmentId);
//                               fragmentsToUse.push(fragment);
//                           }
//                    }
//
//
//                     console.log(fragmentsToUse.length);
//
//                 }
//
//
//                 getFragments();
//
//                 //if teacher chooses difficulty, then reconstruct the grid
//                 redrawContainer = function($container,heightOfOnePiece,widthOfOnePiece,levelsNum){
//                     console.log("redrawContainer");
//                     fragmentsToUse = [];
//                     $container.empty();
//                     getFragments();
//                     for(var k=0; k<levelsNum ; k++)
//                     {
//                       var newDiv=$('<div class="grid-image-div"></div>');
//                       for(var l=0; l<levelsNum; l++)
//                       {
//
//                         fragmentsToUse[k*levelsNum+l].appendTo($(newDiv));
//
//                       }
//                       newDiv.appendTo($(ul));
//                     }
//                 }
//
//
//
//
//                 self.shuffleArray = function(fragmentsToUse){
//
//                       var numOfFragments = fragmentsToUse.length;
//                       console.log(numOfFragments);
//                       var numPicket = 0;
//                       var pickedCardsMap = {};
//                       var shuffledFragments = [];
//                       while (numPicket < numOfFragments) {
//                         var pickIndex = Math.floor(Math.random() * numOfFragments);
//                         if (pickedCardsMap[pickIndex]) {
//                           continue; // Already picked, try again!
//                         }
//
//                         shuffledFragments.push(fragmentsToUse[pickIndex]);
//                         pickedCardsMap[pickIndex] = true;
//                         numPicket++;
//                       }
//
//                       return shuffledFragments;
//                 };
//
//                 shuffledFragments = self.shuffleArray(fragmentsToUse);
//
//                 afterStart = function($container,shuffledFragments){
//
//                     $container.empty();
//
//
//                     $mainDiv = $('<div class="main-div">');
//
//                     $centerDiv = $('<div class="center-div">');
//
//
//                     $leftDiv = $('<div class="left-div">');
//                     $rightDiv = $('<div class="right-div">');
//
//                     for(var k=0; k<levelsNum ; k++)
//                     {
//                             var $newDiv=$('<div class="grid-image-div"></div>');
//                             $leftInnerDiv = $('<div class="left-inner-div">');
//                             $rightInnerDiv = $('<div class="right-inner-div">');
//
//                             for(var l=0; l<levelsNum; l++)
//                             {
//
//                                 var i = (k*levelsNum) + l;
//
//                                 if ((i % 2)=== 0){
//                                   shuffledFragments[i].appendTo($leftInnerDiv);
//                                 }
//                                 else{
//                                   shuffledFragments[i].appendTo($rightInnerDiv);
//                                 }
//
//                             }
//
//                             // $newDiv.appendTo($(ul));
//                             $leftInnerDiv.appendTo($leftDiv);
//                             $rightInnerDiv.appendTo($rightDiv);
//                     }
//
//                     ul=$('<ul class="new-ul">');
//
//                     for(var k=0; k<levelsNum ; k++)
//                     {
//                           var newDiv=$('<div class="grid-image-div"></div>');
//
//                           for(var l=0; l<levelsNum; l++)
//                           {
//
//                             $newList = $('<div class="new-list" data-id= "'+ (k*levelsNum+l) +'">').css('height', heightOfOnePiece + 'px').css('width', widthOfOnePiece + 'px').appendTo($(newDiv));
//
//                           }
//                           newDiv.appendTo($(ul));
//                     }
//
//                     $leftDiv.appendTo($mainDiv);
//                     $centerDiv.append(ul);
//                     $mainDiv.append($centerDiv);
//                     $rightDiv.appendTo($mainDiv);
//                     $container.append($mainDiv);
//
//                             scaleElements = function(){
//
//                                   $(".li-class").addClass('scale-elements-small');
//                                   $(".new-list").addClass('scale-grid-small');
//
//                             }
//                             scaleGrid = function(){
//
//                                   $(".li-class").removeClass('scale-elements-small');
//                                   $(".new-list").removeClass('scale-grid-small');
//
//                             }
//
//                             $(".li-class").draggable({
//
//                                     start: function( event, ui ) {
//                                             scaleElements();
//                                     },
//
//                                     revert: function() {
//
//                                         if ($(this).hasClass('drag-revert')) {
//                                               $(this).removeClass('drag-revert');
//                                               return true;
//                                         }
//
//                                     },
//                                     stop : function() {
//                                         scaleGrid();
//                                     }
//
//                             });
//
//                             $(".new-list").droppable({
//
//                                     accept : ".li-class",
//                                     drop: function( event, ui ) {
//
//                                             var $this = $(this);
//                                             console.log($this.data("id"));
//                                             console.log(ui.draggable.attr("data-id"));
//
//                                             if(ui.draggable.attr("data-id")!= $this.data("id")){
//
//                                                   return $(ui.draggable).addClass('drag-revert');
//
//                                             }
//                                             else{
//
//                                                   console.log("correct position");
//
//                                             }
//
//                                             ui.draggable.position({
//                                                 my: "center",
//                                                 at: "center",
//                                                 of: $this
//                                               });
//                                   }
//                             });
//
//                     H5P.trigger("resize");
//                 }
//
//         }
//
//         //attach function
//         ImageGrid.prototype.attach = function($container){
//
//
//                         $container.addClass('h5p-image-grid');
//
//                         //if teacher allows students to choose dificulty
//                         if(self.params.chooseDifficulty==='true')
//                         {
//                               ul=$('<ul class="ul-class">');
//
//                               for(var k=0; k<levelsNum ; k++)
//                               {
//                                     var $newDiv=$('<div class="grid-image-div"></div>');
//                                     for(var l=0; l<levelsNum; l++)
//                                     {
//
//                                         fragmentsToUse[k*levelsNum+l].appendTo($newDiv);
//
//                                     }
//                                     $newDiv.appendTo($(ul));
//                               }
//                               $container.append(ul);
//
//                               //choose difficulty
//                               $container.append('<div>Difficulty:    <select id="mySelect"><option value="3">9 pieces</option><option value="4">16 pieces</option><option value="5">25 pieces</option><option value="6">36 pieces</option><option value="7">49 pieces</option></select></div><br />');
//                               var obj=document.getElementById('mySelect');
//                               $(obj).change(function(){
//
//                                     self.heightOfOnePiece=self.params.image.height/obj.value;
//                                     self.widthOfOnePiece=self.params.image.width/obj.value;
//                                     levelsNum=obj.value;
//                                     console.log(levelsNum);
//                                     console.log(heightOfOnePiece);
//                                     console.log(widthOfOnePiece);
//
//                                     redrawContainer($(ul),self.heightOfOnePiece,self.widthOfOnePiece,levelsNum);
//                                     shuffledFragments=self.shuffleArray(fragmentsToUse);
//
//                               });
//
//                               //start button
//                               self.$start=UI.createButton({
//                                   title: 'Button',
//                                   'class': 'level-next-button',
//                                   'text' : 'Start the Puzzle',
//                                   click: function() {
//                                       afterStart($container,shuffledFragments);
//                                   },
//                                 }).appendTo($container);
//
//
//
//                         }
//
//                         //if students can choose difficulty
//                         else {
//                               ul=$('<ul class="ul-class">');
//
//                               for(var k=0; k<levelsNum ; k++)
//                               {
//                                 var newDiv=$('<div class="grid-image-div"></div>');
//                                 for(var l=0; l<levelsNum; l++)
//                                 {
//
//                                     fragmentsToUse[k*levelsNum+l].appendTo($(newDiv));
//
//                                 }
//                                 newDiv.appendTo($(ul));
//                               }
//                               $container.append(ul);
//
//                               self.$start=UI.createButton({
//                                   title: 'Button',
//                                   'class': 'level-next-button',
//                                   'text' : 'Start the Puzzle',
//                                   click: function() {
//                                       afterStart($container,shuffledFragments);
//                                         },
//                                 }).appendTo($container);
//
//
//
//                         }
//
//                         H5P.trigger("resize");
//         }
//
//
//         return ImageGrid;
// })(H5P.jQuery,H5P.JoubelUI);

H5P.ImageGrid  = (function($,UI){


function ImageGrid(params,id){
  //constructor

  var self = this;
  var gridSrcImage = H5P.getPath(params.image.path, id);
  var imageOrientation,screenOrientation;
  var gameMode =[];
  var imageFragments = [];
  var MIN_IMAGE_WIDTH=600;
  var MIN_IMAGE_HEIGHT=300;
  var gameLevel = params.levels;

  var getImageOrientation = function(){

    if(params.image.width >= params.image.height ){
      return 'landscape';
    }
    else{
      return 'portrait';
    }
  }

  var getScreenOrientation = function(){
    if (window.matchMedia("(orientation: portrait)").matches) {
       return 'portrait';
     }

    if (window.matchMedia("(orientation: landscape)").matches) {
       return 'landscape';
    }

  }

  imageOrientation = getImageOrientation();
  screenOrientation = getScreenOrientation();
  gameMode=[imageOrientation,screenOrientation];

  var setContainerOrientation = function($container){

    if(imageOrientation == 'landscape'){
      $container.find('div').addClass('container-landscape');
      if(MIN_IMAGE_WIDTH >= params.image.width){
        $container.find('img').width(MIN_IMAGE_WIDTH+'px');
      }
    }else{
      $container.find('div').addClass('container-portrait');
      if(params.image.height < MIN_IMAGE_HEIGHT){
          $container.find('img').height(MIN_IMAGE_HEIGHT+'px');
      }
    }

  }

  var getFragmentsToUse = function(width,height){

    for(var i=0;i<gameLevel;i++){
      for(var j=0;j<gameLevel;j++){

         var fragment = new ImageGrid.Fragment(params.image,id,i,j,gameLevel,width,height);
         imageFragments.push(fragment);
      }
    }

    H5P.shuffleArray(imageFragments);

  }

  var createGridOverImage = function($container,width,height){

    var fragmentWidth = Math.floor(width/gameLevel);
    var fragmentHeight = Math.floor(height/gameLevel);
    var $canvasContainer = $('<canvas class="grid-canvas" width="'+width+'" height="'+height+'">');
    $canvasContainer.css('background-image','url("'+gridSrcImage+'")');
    $container.html($canvasContainer);
    var context = $canvasContainer[0].getContext("2d");
    context.strokeStyle = "#cccccc";
    context.lineWidth = 2;

    for(var i=0;i<gameLevel;i++){

      for(var j=0; j<gameLevel;j++){

        context.rect(j*fragmentWidth,i*fragmentHeight,fragmentWidth,fragmentHeight);
        context.stroke();

      }
    }

  }

  var createFirstLevelHolders = function(level,fragmentWidth,fragmentHeight){

    var holderContainer = [];

    for(var i=0;i<level;i++){
      for(var j=0;j<level;j++){
        if((i==0 || i== level-1) ||(j==0 || j== level-1)) {

          console.log("the value of j is"+(i*level+j));
          //place the fragments in all over the row
          var $fragmentContainer= $('<div class="li-class-primary-container"/>');
          $fragmentContainer.css('height',(fragmentHeight)+'px');
          $fragmentContainer.css('width',(fragmentWidth)+'px');
          $fragmentContainer.css('top',(i*fragmentHeight+(i*2))+'px');
          $fragmentContainer.css('left',(j*fragmentWidth+(j*2))+'px');

          holderContainer.push($fragmentContainer)
          // imageFragments[0].appendTo($fragmentContainer);
          // $fragmentContainer.appendTo($container);

        }


      }
    }

    return holderContainer;

  }

  var createSecondLevelHolders = function(level,fragmentWidth,fragmentHeight){

    var holderContainer = [];

    for(var i=0;i<level;i++){
      for(var j=0;j<level;j++){
        if(i==0 || i== level-1)  {


          //place the fragments in all over the row
          var $fragmentContainer= $('<div class="li-class-secondary-container"/>');
          $fragmentContainer.css('height',(fragmentHeight)+'px');
          $fragmentContainer.css('width',(fragmentWidth)+'px');
          $fragmentContainer.css('top',(i*fragmentHeight+(i*2)+((i/(level-1))*fragmentHeight))+'px');
          $fragmentContainer.css('left',(j*fragmentWidth+(j*2)+(fragmentWidth/2))+'px');

          holderContainer.push($fragmentContainer);
          // imageFragments[0].appendTo($fragmentContainer);
          // $fragmentContainer.appendTo($container);

        }

        else if(j==0 || j== level-1){

          var $fragmentContainer= $('<div class="li-class-secondary-container"/>');
          $fragmentContainer.css('height',(fragmentHeight)+'px');
          $fragmentContainer.css('width',(fragmentWidth)+'px');
          $fragmentContainer.css('top',(i*fragmentHeight+(i*2)+(fragmentHeight/2))+'px');
          $fragmentContainer.css('left',(j*fragmentWidth+(j*2)+((j/(level-1))*fragmentWidth))+'px');

          holderContainer.push($fragmentContainer);
        }


      }
    }

    return holderContainer;

  }

  var createGameBoard = function($container,width,height){

    $container.empty();

    var fragmentWidth = Math.floor(width/gameLevel);
    var fragmentHeight = Math.floor(height/gameLevel);
    $container.css('height',(gameLevel*fragmentHeight)+'px');

    getFragmentsToUse(fragmentWidth,fragmentHeight);

    if(gameMode[1]=== 'landscape'){
      // place the images around the container;

      var holders=[];
      var firstLevelHolders=[];
      var secondLevelHolders=[];

      var level = parseInt(gameLevel)+2;
      // var firstLevelHolders = level*4;
      // var secondLevelHolders = gameLevel*4;

      //create firstLevelHolders
      // pickrandom holders of gamelevel2 lenght

      holders = createFirstLevelHolders(level,fragmentWidth,fragmentHeight);


      if(((level-1)*4) < gameLevel*gameLevel){
        var rqdSecondaryHolders = (gameLevel*gameLevel) - ((level-1)*4);
        secondLevelHolders = createSecondLevelHolders(level-1,fragmentWidth,fragmentHeight);
        H5P.shuffleArray(secondLevelHolders);
        holders= holders.concat(secondLevelHolders.slice(0,rqdSecondaryHolders));
        console.log(secondLevelHolders.slice(0,rqdSecondaryHolders).length);
      }
      H5P.shuffleArray(holders);
      var finalHolders= holders.splice(0, gameLevel*gameLevel );




      $container.css('height',((parseInt(gameLevel)+2)*fragmentHeight)+'px');

      for(var i=0;i<gameLevel;i++){
        for(var j=0;j<gameLevel;j++){
          var $fragmentContainer= finalHolders[(i*gameLevel+j)];
          imageFragments[(i*gameLevel+j)].appendTo($fragmentContainer);
          $fragmentContainer.appendTo($container);
        }
      }




    }







  }

  console.log(gameMode);

  // all code goes here

  self.attach = function($container){

    console.log($container.width());
    var imageWidth,imageHeight;

    var $gameContainer = $('<div class="game-container"><img src="'+gridSrcImage+'"/></div>').appendTo($container);
    $container.addClass('h5p-image-grid');
    setContainerOrientation($container);
    imageWidth=$container.find('img').width();
    imageHeight= $container.find('img').height();
    createGridOverImage ($gameContainer,imageWidth,imageHeight);


    if(params.chooseDifficulty==='true'){

      var $difficultyContainer = $('<div class="difficulty-container"><div class="difficulty-label"> Difficulty: </div>\
      <div  class="difficulty-selector"><select><option value="3">9 Pieces</option> \
      <option value="4">16 Pieces</option>\
      <option value="5">25 Pieces</option>\
      <option value="6">36 Pieces</option>\
      <option value="7">49 Pieces</option></select></div></div>');
      $container.append($difficultyContainer);

      $difficultyContainer.find('select').on('change', function(){
        gameLevel=this.value;
        createGridOverImage ($gameContainer,imageWidth,imageHeight);
      });

    }


    var $fullScreenTogglerContainer= $('<div class="screen-toggler-container"></div>').appendTo($container);
    var $fullScreenToggler=$('<label class="switch">FullScreen</label><label class="switch"> <input type="checkbox">  <span class="slider round"></span>\
    </label>').appendTo($fullScreenTogglerContainer);

    var $startPuzzleButtonContainer = $('<div class="start-puzzle-button-container"></div>').appendTo($container);

    var $startPuzzleButton = UI.createButton({
      title: 'Button',
      'text': 'Start The Puzzle',
      click: function(){
        createGameBoard($container,imageWidth,imageHeight);
      },

    }).appendTo($startPuzzleButtonContainer);







    self.trigger('resize');
  }



}


return ImageGrid;
})(H5P.jQuery,H5P.JoubelUI);
