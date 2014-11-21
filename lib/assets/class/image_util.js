function ImageUtil(src){
  this.image = new Image();
  this.image.src = src;

  this.canvas = $('<canvas />')[0];
  this.canvas.width = this.image.width;
  this.canvas.height = this.image.height;
  this.canvas.getContext('2d').drawImage(this.image, 0, 0, this.image.width, this.image.height);

  this.getPixel = function(x,y){
    return this.canvas.getContext('2d').getImageData(x, y, 1, 1).data;
  };
  this.getDataPixel = function(x,y){
    var rgb = this.canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    var i = rgb[0] + rgb[1] * 256 +  rgb[2] * 256 * 257;
   return i;
  };
  this.convertToGrid = function(){
    var grid = [];
    for(var i = 0; i < this.image.width; i++){
      grid[i] = [];
      for(var j = 0; j < this.image.height; j++){
        grid[i].push(this.getDataPixel(i,j));
      }
    }
    return grid;
  };
  this.convertToInvertGridMask = function(){
    var grid = [];
    for(var i = 0; i < this.image.height; i++){
      grid[i] = [];
      for(var j = 0; j < this.image.width; j++){
        if(this.getDataPixel(j,i) > 0){
          grid[i].push(0);
          continue;
        }
        grid[i].push(1);
      }
    }
    return grid;
  };
}