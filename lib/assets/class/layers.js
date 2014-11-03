function Layers(){
  this.current_layer;

  this.changeTo = function(info){
    this.current_layer = info.layer;

    switch(info.effect){
      case this.EFFECT_INSTANT:
        $('layer').css({ 'opacity' : 0 }).hide();
        $('#' + info.layer).css({ 'opacity' : 1 });
        $('#' + info.layer).show();
      break;
    }
  }
}
Layers.prototype.LAYER_LOADING = "loading";
Layers.prototype.LAYER_LOGIN = "login";
Layers.prototype.LAYER_REGISTER = "register";

Layers.prototype.EFFECT_INSTANT = "instant";