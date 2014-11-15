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
  };
}