function GameView(id_canvas){
  this.canvas = document.getElementById(id_canvas);
  this.ctx = this.canvas.getContext("2d");
  this.ctx.imageSmoothingEnabled = false;

  this.resize = function(){
    $(this.canvas).attr('width',Math.round($(window).innerWidth()/16)*16);
    $(this.canvas).attr('height',Math.round($(window).innerHeight()/16)*16);
    $(this.canvas).css({ marginTop : $(window).innerHeight() * 0.5 - this.canvas.height * 0.5 })
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx.imageSmoothingEnabled = false;

    main.gamemotor.map.render_ratio_h = Math.ceil(this.width / (16 * main.gamemotor.map.scale));
    main.gamemotor.map.render_ratio_v = Math.ceil(this.height / (16 * main.gamemotor.map.scale));
  };
  this.resize();
}