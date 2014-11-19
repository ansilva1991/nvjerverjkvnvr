function Survivor(info){
  this.x = info.x;
  this.y = info.y;
  this.status = 'idle';
  this.path;

  this.avatar = new AvatarHuman({ skin : 0 });
  this.Start = function(){
    this.avatar.updateResources();
  };
  this.Update = function(){
    if(this.status == 'walk'){
      var square = main.gamemotor.map.grid/3;
      if(this.path[0] != undefined){

        this.x = this.path[0][0] * square;
        this.y = this.path[0][1] * square;
        this.path.splice(0,1);
      }
      else
      {
        this.x = Math.floor(this.x/square)*square;
        this.y = Math.floor(this.y/square)*square;
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