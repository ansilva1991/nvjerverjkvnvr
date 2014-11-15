function GameMotor(){
  this.gameview = new GameView("canvas_game");
  this.map = new Map();

  this.Start = function(){
    main.loop.Start();
  };
  this.Update = function(){
    this.map.Update();
    this.Draw();
  };
  this.Draw = function(){
    var ctx = this.gameview.ctx
    ctx.styleFill = "#000";
    ctx.fillRect(0,0,this.gameview.width,this.gameview.height);

    this.map.Draw(ctx);
  };
}