function Survivor(info){
  this.x = info.x;
  this.y = info.y;
  this.vel = 1;
  this.status = 'idle';
  this.path;
  this.start_point = [];
  this.next_point = [];

  this.avatar = new AvatarHuman({ skin : 0 });
  this.Start = function(){
    this.avatar.changeAnim("idle");
    this.avatar.updateResources();
  };
  this.Update = function(){
    if(this.status == 'idle'){
      this.avatar.changeAnim("idle");
    }
    if(this.status == 'walk'){
      this.avatar.changeAnim("walk");
      var square = main.gamemotor.map.grid/3;
      if(this.path[0] != undefined){
        var xx = (this.path[0][0] * square) + square * 0.5;
        var yy = (this.path[0][1] * square) + square * 0.5;

        if(!this.next_point.equals([xx,yy])){
          this.start_point = [this.x,this.y];
          this.next_point = [xx,yy];
        }
        if(this.start_point[0] < this.next_point[0]){
          if(xx > this.x){ this.x += this.vel; }
          if(this.x > xx){ this.x = xx; }
        }
        if(this.start_point[0] > this.next_point[0]){
          if(xx < this.x){ this.x -= this.vel; }
          if(this.x < xx){ this.x = xx; }
        }
        if(this.start_point[1] < this.next_point[1]){
          if(yy > this.y){ this.y += this.vel; }
          if(this.y > yy){ this.y = yy; }
        }
        if(this.start_point[1] > this.next_point[1]){
          if(yy < this.y){ this.y -= this.vel; }
          if(this.y < xx){ this.y = yy; }
        }

        if((this.x == xx) && (this.y == yy)){
          this.path.splice(0,1);
        }
      }
      else
      {
        this.x = (Math.floor(this.x/square)*square) + square * 0.5;
        this.y = (Math.floor(this.y/square)*square) + square * 0.5;
        this.status = "idle";
      }
    }
    //Update avatar
    this.avatar.x = this.x;
    this.avatar.y = this.y;

    this.avatar.Update();
  };
  this.Draw = function(ctx){
    this.avatar.Draw(ctx);
  };
  this.walkTo = function(x,y){
    var finder = new PF.AStarFinder({
      allowDiagonal: true,
       dontCrossCorners: true
    });
    var square = main.gamemotor.map.grid/3;
    var from = [ Math.floor(this.x/square), Math.floor(this.y/square) ];
    var to = [ Math.floor(x/square), Math.floor(y/square) ];

    this.path = finder.findPath(from[0], from[1],to[0] ,to[1], main.gamemotor.map.getPathGrid());
    this.status = "walk";
  };
}