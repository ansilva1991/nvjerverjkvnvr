function Main()
{
	this.resources = new Resources();
	this.layers = new Layers();
	this.gameview;
	
	this.Start = function(){	
		this.resources.init_resources();
	};
}