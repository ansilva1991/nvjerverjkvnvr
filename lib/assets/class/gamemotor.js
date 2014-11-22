function GameMotor(){
  this.gameview;
  this.map = new Map();
  this.objects = new ObjectsList();
  this.gui = new GUI();
  this.survivor_selected = -1;

  this.Start = function(){
    this.gameview = new GameView("canvas_game");
    for( i = 0; i < main.resources.last_info.survivors.length;i++){
      this.objects.add(new Survivor(main.resources.last_info.survivors[i]));
    }
    this.objects.Start_all();
    this.gui.Start();
    this.selectSurvivor(0);
    this.survivor_selected.main_survivor = true;
    main.loop.Start();
    for(var i = 1; i < main.gamemotor.objects.survivors().length; i++){
      main.gamemotor.objects.survivors()[i].task = "follow"
    }
  };
  this.Update = function(){
    this.map.Update();
    this.objects.Update_all();
    this.gui.Update();
    this.Draw();
  };
  this.Draw = function(){
    var ctx = this.gameview.ctx
    ctx.styleFill = "#000";
    ctx.fillRect(0,0,this.gameview.width,this.gameview.height);

    this.map.Draw(ctx);
  };
  this.leftClick = function(x,y){
    this.map.leftClick(x,y);
  };
  this.rightClick = function(x,y){
    this.map.rightClick(x,y);
  };
  this.selectSurvivor = function(id){
    if(id == this.survivor_selected){ return; }
    this.survivor_selected = this.objects.survivors()[id];
    this.map.center_object = this.survivor_selected;
    this.gui.selectSurvivor(id);
  };
}