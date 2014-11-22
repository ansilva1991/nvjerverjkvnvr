function Main()
{
  this.resources = new Resources();
  this.layers = new Layers();
  this.gamemotor;
  this.loop;

  this.Start = function(){
    this.resources.init_resources();
  };
  this.startGame = function(){
    this.gamemotor = new GameMotor();
    this.loop = new GameLoop(function(){
      main.gamemotor.Update();
    })
    this.gamemotor.Start();
    $(window).resize(function(){
      main.gamemotor.gameview.resize();
    });
  };
  this.leftClick = function(x,y){
    this.gamemotor.leftClick(x,y);
  };
  this.rightClick = function(x,y){
    this.gamemotor.rightClick(x,y);
  };
  $('#canvas_game').mousedown(function(e){
    if(e.which == 1){
      main.leftClick(e.offsetX,e.offsetY)
    }
    if(e.which == 3){
      main.rightClick(e.offsetX,e.offsetY);
    }
  });
  $(document).on('contextmenu', function(e){
    e.stopPropagation();
    return false;
  });
}