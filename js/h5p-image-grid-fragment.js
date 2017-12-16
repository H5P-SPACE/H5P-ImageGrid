(function(ImageGrid,$){

        ImageGrid.Fragment= function(width,height,row,col){

                this.width = width;
                this.height = height;
                this.row = row;
                this.col = col;
                console.log(row+"_"+col);
        }

        ImageGrid.Fragment.prototype.constructor = ImageGrid.Fragment;

        return ImageGrid.Fragment;
})(H5P.ImageGrid,H5P.jQuery);
