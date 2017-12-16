
//code starts here
H5P.ImageGrid = (function($){

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
                        console.log("calling");
                        createImageGrid();

                }


                //when image loaded
                imageLoaded();
                H5P.shuffleArray(fragmentList);

        };

        ImageGrid.prototype.attach = function($container){
                //attach function
                $container.addClass('h5p-image-grid');
                $container.append('<img src="'+ H5P.getPath(self.params.image.path,self.id)+'"/>');
                var $grid = $('<ul class="grid-container" >');
                 for(var i=0;i<fragmentList.length;i++){

                        var $element= $("<li />").
                                css("background-position","-" + (fragmentList[i].width*fragmentList[i].col) +"px -" +(fragmentList[i].height*fragmentList[i].row) +"px")
                                .css("width", fragmentWidth+"px")
                                .css("height", fragmentHeight+"px")
                                .css("background-image", "url("+H5P.getPath(self.params.image.path,self.id)+")")
                                .css("display", "inline-block")
                                .css("margin", 2);
                
                        $grid.append($element);
                } 

               
                $container.append($grid);
                H5P.trigger("resize");
                
        }

        return ImageGrid;
})(H5P.jQuery);
