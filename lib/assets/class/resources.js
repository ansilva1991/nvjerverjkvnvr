function Resources(){
  this.images = new Object();
  this.last_info = new Object();
  this.total_resources = 0;
  this.loaded_resources = 0;

  this.init_resources = function(){
    var resources = [
      {
        name : '0_hair_1_m',
        type : 'images',
        type_file : 'png'
      },{
        name : 'data',
        type : 'last_info'
      }
    ];

    main.layers.changeTo({
      layer : Layers.prototype.LAYER_LOADING,
      effect : Layers.prototype.EFFECT_INSTANT
    });

    for(var i = 0; i < resources.length; i++){
      this.load_resource({
        name : resources[i].name,
        type : resources[i].type,
        type_file : resources[i].type_file,
        callback : function(){
          main.resources.loaded_resources ++;
          var perc = main.resources.loaded_resources * 100 / main.resources.total_resources;
          $('#loading_bar').css({ width : perc + '%' });

          if(perc == 100){
            main.layers.changeTo({
              layer : Layers.prototype.LAYER_GAME,
              effect : Layers.prototype.EFFECT_INSTANT
            });
            main.startGame();
          }
        }
      });
    }
  }

  this.load_resource = function(info){
    if(info.callback == undefined){
      info.callback = function(){};
    }
    if(this[info.type][info.name] == undefined){
      if(info.type == 'images'){
        var tmp = new Image();
        tmp.onload = function(){
          info.callback();
        }
        tmp.src = 'assets/' + info.name + "." + info.type_file + "?" + assets_version;
      }
      if(info.type == 'last_info'){
        var tmp = $.getJSON("play/get_last_info",function(e){
          main.resources.last_info = e;
          main.resources.last_info.zone.floor_tiles = new ImageUtil("data:image/png;base64," + e.zone.floor_tiles).convertToGrid();
          main.resources.last_info.zone.static_mask = new ImageUtil("data:image/png;base64," + e.zone.static_mask).convertToInvertGridMask();
          info.callback();
        });
      }

      this[info.type][info.name] = tmp;
      this.total_resources++;
    }

    return this[info.type][info.name];
  }
}