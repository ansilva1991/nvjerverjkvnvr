function Map(){
  this.tile_set = main.resources.load_resource({
    name : 'tile_0',
    type : 'images',
    type_file : 'png'
  });
  this.floor_tiles = main.resources.last_info.zone.floor_tiles;
  this.static_mask = main.resources.last_info.zone.static_mask;
  this.width = main.resources.last_info.zone.floor_tiles.length;
  this.height = main.resources.last_info.zone.floor_tiles[0].length;

  this.center_x = 0;
  this.center_y = 0;
  this.center_object = undefined;

  this.render_ratio_h = 25;
  this.render_ratio_v = 13;
  this.light_ratio = 8;
  this.grid = 16;
  this.scale = 2;
  this.Update = function(){
    if(this.center_object != undefined){
      if(this.distanceTo([this.center_x,this.center_y],[this.center_object.x,this.center_object.y]) > 2){
        this.center_x -= (this.center_x - this.center_object.x) * 0.1;
        this.center_y -= (this.center_y - this.center_object.y) * 0.1;
      }else{
        this.center_x = this.center_object.x;
        this.center_y = this.center_object.y;
      }
    }
    this.center_x = Math.round(this.center_x);
    this.center_y = Math.round(this.center_y);
  };
  this.Draw = function(ctx){
    var init_h = this.center_x/this.grid - (this.render_ratio_h * 0.5);
    var init_v = this.center_y/this.grid - (this.render_ratio_v * 0.5);
    if(init_h < 0){ init_h = 0; }
    if(init_v < 0){ init_v = 0; }

    var end_h =  init_h + this.render_ratio_h;
    var end_v = init_v + this.render_ratio_v;

    if(end_h > this.width - 1){
      end_h = this.width - 1;
      init_h = end_h - this.render_ratio_h;
    }
    if(end_v > this.height - 1){
      end_v = this.height - 1;
      init_v = end_v - this.render_ratio_v;
    }
    var center_x_ctx = main.gamemotor.gameview.width * (0.5/this.scale);
    var center_y_ctx = main.gamemotor.gameview.height * (0.5/this.scale);

    if(this.center_x < center_x_ctx){
      center_x_ctx = this.center_x;
    }
    if(this.center_y < center_y_ctx){
      center_y_ctx = this.center_y;
    }
    if(this.center_x > this.width * this.grid - center_x_ctx){
      var dif = this.center_x - (this.width * this.grid - center_x_ctx);
      center_x_ctx += dif;
    }
    if(this.center_y > this.height * this.grid - center_y_ctx){
      var dif = this.center_y - (this.height * this.grid - center_y_ctx);
      center_y_ctx += dif;
    }
    ctx.save();
      ctx.scale(this.scale,this.scale);
      ctx.translate(this.getTranslated()[0],this.getTranslated()[1]);
      /**Floor Tiles**/
      for(var i = Math.floor(init_h); i <= Math.ceil(end_h); i++){
        for(var j = Math.floor(init_v); j <= Math.ceil(end_v);j++){
          var x = i*this.grid;
          var y = j*this.grid ;
          var distance = main.gamemotor.objects.mindistToAllObjects([x,y],Survivor)/16;
          if(distance <= this.light_ratio){
            ctx.drawImage(this.tile_set,this.floor_tiles[i][j]*this.grid,0,this.grid,this.grid,x,y,this.grid,this.grid);
          }
        }
      }
      /**Objects**/
      main.gamemotor.objects.Draw_all(ctx);
      /**Light View**/
      for(var i = Math.floor(init_h); i <= Math.ceil(end_h); i++){
        for(var j = Math.floor(init_v); j <= Math.ceil(end_v);j++){
          var x = i*this.grid;
          var y = j*this.grid;
          var distance = main.gamemotor.objects.mindistToAllObjects([x,y],Survivor)/16;
          if(distance > this.light_ratio * 0.75){
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(x,y,this.grid,this.grid);
          }
          if(distance > this.light_ratio){
            ctx.fillStyle = "#000";
            ctx.fillRect(x,y,this.grid,this.grid);
          }
        }
      }
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(this.center_x-2,this.center_y-2,4,4);
    ctx.restore();
    //main.loop.Stop();
  };
  this.leftClick = function(x,y){

  };
  this.rightClick = function(x,y){
    var xx = x/this.scale - this.getTranslated()[0];
    var yy = y/this.scale - this.getTranslated()[1];

    main.gamemotor.survivor_selected.walkTo(xx,yy);
  };
  this.getTranslated = function(){
    var center_x_ctx = main.gamemotor.gameview.width * (0.5/this.scale);
    var center_y_ctx = main.gamemotor.gameview.height * (0.5/this.scale);
    if(this.center_x < center_x_ctx){
      center_x_ctx = this.center_x;
    }
    if(this.center_y < center_y_ctx){
      center_y_ctx = this.center_y;
    }
    if(this.center_x > this.width * this.grid - center_x_ctx){
      var dif = this.center_x - (this.width * this.grid - center_x_ctx);
      center_x_ctx += dif;
    }
    if(this.center_y > this.height * this.grid - center_y_ctx){
      var dif = this.center_y - (this.height * this.grid - center_y_ctx);
      center_y_ctx += dif;
    }
    return [center_x_ctx - this.center_x,center_y_ctx - this.center_y];
  };
  this.distanceTo = function(o,d){
    return Math.sqrt(Math.pow(d[0] - o[0],2) + Math.pow(d[1] - o[1],2));
  };
  this.getPathGrid = function(opt){
    var tmp = main.gamemotor.objects.setInMask(this.static_mask,['Survivor'],opt);
    return new PF.Grid(this.width * 3,this.height * 3, tmp);
  };
}