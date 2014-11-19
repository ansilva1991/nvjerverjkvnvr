function GameMotor(){
  this.gameview = new GameView("canvas_game");
  this.map = new Map();
  this.objects = new ObjectsList();
  this.survivors_selected = [0];

  this.Start = function(){
    for( i = 0; i < main.resources.last_info.survivors.length;i++){
      this.objects.add(new Survivor(main.resources.last_info.survivors[i]));
    }
    this.objects.Start_all();
    this.map.center_object = main.resources.last_info.survivors[0];
    main.loop.Start();
  };
  this.Update = function(){
    this.map.Update();
    this.objects.Update_all();
    this.Draw();
  };
  this.Draw = function(){
    var ctx = this.gameview.ctx
    ctx.styleFill = "#000";
    ctx.fillRect(0,0,this.gameview.width,this.gameview.height);

    this.map.Draw(ctx);
  };
}