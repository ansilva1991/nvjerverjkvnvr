function Survivor(info){
  this.x = info.x;
  this.y = info.y;
  this.vel = 2;
  this.status = 'idle';
  this.path;
  this.start_point = [];
  this.next_point = [];
  this.main_survivor = false;

  this.wait_time_follow = 0;
  this.max_wait_time_follow = 100;

  this.task = "";

  this.avatar = new AvatarHuman({ skin : 0 });
  this.Start = function(){
    this.avatar.changeAnim("idle");
    this.avatar.updateResources();
  };
  this.Update = function(){
    if(this.status == 'idle'){
      this.avatar.changeAnim("idle");
      if(this.task == "follow"){
        var d = main.gamemotor.objects.distanceTo(this,main.gamemotor.objects.survivors()[0]);
        if((d > 10)&&(main.gamemotor.objects.survivors()[0].status == "walk")){
          this.walkTo(main.gamemotor.objects.survivors()[0].x,main.gamemotor.objects.survivors()[0].y);
        }
        if((d > 30)&&(main.gamemotor.objects.survivors()[0].status == "idle")){
          this.walkTo(main.gamemotor.objects.survivors()[0].x,main.gamemotor.objects.survivors()[0].y);
        }
      }
    }
    if(this.status == 'walk'){
      this.avatar.changeAnim("walk");
      var square = main.gamemotor.map.grid/3;
      if(this.path[0] != undefined){
        var xx = (this.path[0][0] * square) + square * 0.5;
        var yy = (this.path[0][1] * square) + square * 0.5;

        if(main.gamemotor.objects.ifSurvivorIn(this.path[0],this.id))
        {
          this.status = "wait_for_walk";
          if(this.main_survivor){
            //main.gamemotor.objects.getSurvivorIn(this.path[0]).randomMove();
          }
          return;
        }

        if(!this.next_point.equals([xx,yy])){
          this.wait_time_follow = 0;
          this.start_point = [this.x,this.y];
          this.next_point = [xx,yy];
        }
        if(this.start_point[0] < this.next_point[0]){
          if(this.next_point[0] > this.x){ this.x += this.vel; }
          if(this.x > this.next_point[0]){ this.x = this.next_point[0]; }
        }
        if(this.start_point[0] > this.next_point[0]){
          if(this.next_point[0] < this.x){ this.x -= this.vel; }
          if(this.x < this.next_point[0]){ this.x = this.next_point[0]; }
        }
        if(this.start_point[1] < this.next_point[1]){
          if(this.next_point[1] > this.y){ this.y += this.vel; }
          if(this.y > this.next_point[1]){ this.y = this.next_point[1]; }
        }
        if(this.start_point[1] > this.next_point[1]){
          if(this.next_point[1] < this.y){ this.y -= this.vel; }
          if(this.y < this.next_point[1]){ this.y = this.next_point[1]; }
        }

        if((this.x == this.next_point[0]) && (this.y == this.next_point[1])){
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
    if(this.status == "wait_for_walk"){
      this.avatar.changeAnim("idle");
      if(!main.gamemotor.objects.ifSurvivorIn(this.path[0]))
      {
        this.status = "walk";
        return;
      }

      this.wait_time_follow += 1;
      if(this.wait_time_follow == this.max_wait_time_follow * 0.25){
        var square = main.gamemotor.map.grid/3;
        var end_point_x = (this.path[this.path.length - 1][0] * square) + square * 0.5;
        var end_point_y = (this.path[this.path.length - 1][1] * square) + square * 0.5;
        var new_path = this.getPath(this.x,this.y,end_point_x,end_point_y,{ detect_survivors : true, force_open : this.path[this.path.length - 1] })
        if(new_path.length > 0){
          this.path = new_path;
        }
      }
      if(this.wait_time_follow > this.max_wait_time_follow){
        this.max_wait_time_follow = 0;
        this.status = "idle";
      }
    }
    this.avatar.Update();
  };
  this.Draw = function(ctx){
    this.avatar.Draw(ctx,this.x,this.y);
  };
  this.walkTo = function(x,y){
    this.path = this.getPath(this.x,this.y,x,y);
    this.status = "walk";
  };
  this.getPath = function(x,y,x1,y1,opt){
    var finder = new PF.AStarFinder({
      allowDiagonal: true,
       dontCrossCorners: true
    });
    var square = main.gamemotor.map.grid/3;
    var from = [ Math.floor(x/square), Math.floor(y/square) ];
    var to = [ Math.floor(x1/square), Math.floor(y1/square) ];

    var path = finder.findPath(from[0], from[1],to[0] ,to[1], main.gamemotor.map.getPathGrid(opt));
    path.splice(0,1);

    return path;
  };
}