function Register(){
  main.layers.changeTo({
    layer : Layers.prototype.LAYER_REGISTER,
    effect : Layers.prototype.EFFECT_INSTANT
  });
}
function UnRegister(){
  main.layers.changeTo({
    layer : Layers.prototype.LAYER_LOGIN,
    effect : Layers.prototype.EFFECT_INSTANT
  });
}