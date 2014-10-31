function Layers(){
  this.current_layer;

  this.changeTo = function(layer,effect){
    this.current_layer = layer;

    switch(effect){
      case this.EFFECT_INSTANT:
        $('layer').css({ 'opacity' : 0 }).hide();
        $('#' + layer).css({ 'opacity' : 1 });
        $('#' + layer).show();
      break;
    }
  }
}
Layers.prototype.LAYER_LOADING = "loading";
Layers.prototype.LAYER_LOGIN = "login";
Layers.prototype.LAYER_REGISTER = "register";

Layers.prototype.EFFECT_INSTANT = "instant";