
//code starts here
H5P.ImageGrid = (function($,UI){

        //variable declaration part
        var self = this;
        var fragmentList = [];
        var fragmentWidth,fragmentHeight;
        //constructor
        function ImageGrid(params,id){
                //constructor code goes here
                self.params = params;

                self.id = id;
                var level = params.levels;
                var imageHeight = params.image.height;
                var imageWidth = params.image.width;
                var margin = 2;
                var createImageGrid = function(){

                        var gridWidth = parseInt(imageWidth)+(margin*level*2);
                        var gridHeight = parseInt(imageHeight)+(margin*level*2);

                        fragmentWidth = Math.floor(imageWidth/level);
                        fragmentHeight = Math.floor(imageHeight/level);
                        for(var i=0;i<level;i++){
                                for(var j=0;j<level;j++)
                                {
                                        fragmentList.push(new ImageGrid.Fragment(fragmentWidth,fragmentHeight,i,j));
                                 }


                         }


                }
                var imageLoaded = function(){
                        //
                        // console.log("calling");
                        createImageGrid();

                }

                self.constructGrid = function(){

                var $grid = $('<ul class="grid-container" >');

                  for(var i=0;i<level;i++){

                    var $row = $('<div class="row" />');
                    for(var j=0;j<level;j++){

                      var $element= $("<li />").
                                   css("background-position","-" + (fragmentList[i*level+j].width*fragmentList[i*level+j].col) +"px -" +(fragmentList[i*level+j].height*fragmentList[i*level+j].row) +"px")
                                   .css("width", fragmentWidth+"px")
                                   .css("height", fragmentHeight+"px")
                                   .css("background-image", "url("+H5P.getPath(self.params.image.path,self.id)+")")
                                   .css("display", "inline-block")
                                   .css("margin", 1);



                      $row.append($element);

                    }
                    $grid.append($row)
                  }

                  return $grid;
                }


                //when image loaded
                imageLoaded();
                // H5P.shuffleArray(fragmentList);

        };

        ImageGrid.prototype.attach = function($container){
                //attach function
                $container.addClass('h5p-image-grid');
                // $container.append('<img src="'+ H5P.getPath(self.params.image.path,self.id)+'"/>');


               var $grid=self.constructGrid();



                //ifuser can select the difficulty
                // code goes here

                //allow fullscreen

                //display the start puzzle button

        //         self.$submit = UI.createButton({
        //                     title: 'Submit',
        //   click: function(event) {
        //     var order = $list.sortable("toArray");
        //     gameSubmitted(order, $list);
        //   },
        //   html: '<span><i class="fa fa-check" aria-hidden="true"></i></span>&nbsp;' + parameters.l10n.checkAnswer
        // });
        // self.$submit.appendTo(self.$buttonContainer);

                var $startPuzzleButton = UI.createButton({
                  title: 'Submit',
                  click: function(event){
                    alert("working");
                  },
                  html: 'Start the puzzle'
                });

                $container.append($grid);
                $container.append($startPuzzleButton);


                H5P.trigger("resize");

        }

        return ImageGrid;
})(H5P.jQuery,H5P.JoubelUI);
