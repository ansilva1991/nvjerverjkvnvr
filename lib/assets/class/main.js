function Main()
{
	this.resources = new Resources();
	this.layers = new Layers();
	this.gameview;
	
	this.last_click = -1;
	
	this.Start = function(){	
		this.resources.init_resources();
	};
}