function Resources(){
  this.images = new Object();
  this.total_resources = 0;
  this.loaded_resources = 0;
  
  this.init_resources = function(){
    var resources = [
      {
        name : 'boton',
        type : 'images',
        src : 'boton-descarga.png'
      }
    ];

    main.layers.changeTo(Layers.prototype.LAYER_LOADING,Layers.prototype.EFFECT_INSTANT);

    for(var i = 0; i < resources.length; i++){
      this.load_resource(resources[i].name,resources[i].type,resources[i].src,function(){
        main.resources.loaded_resources ++;
        var perc = main.resources.loaded_resources * 100 / main.resources.total_resources;
        $('.loading_bar').css({ width : perc + '%' });

        if(perc == 100){
          main.layers.changeTo(Layers.prototype.LAYER_LOGIN,Layers.prototype.EFFECT_INSTANT);
        }
      });
    }
  }

  this.load_resource = function(name,type,src,callback){
    if(this[type][name] == undefined){
      if(type == 'images'){
        var tmp = new Image();
        tmp.onload = function(){
          callback();
        }
      }
      tmp.src = 'assets/' + src;

      this[type][name] = tmp;
      this.total_resources++;
    }
  }
}