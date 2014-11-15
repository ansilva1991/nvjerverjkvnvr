function GameView(id_canvas){
  this.canvas = document.getElementById(id_canvas);
  this.ctx = this.canvas.getContext("2d");
  this.ctx.imageSmoothingEnabled = false;

  this.width = this.canvas.width;
  this.height = this.canvas.height;
}