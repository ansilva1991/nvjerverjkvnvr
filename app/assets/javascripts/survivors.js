//= require loop_game
//= require resources
//= require avatar_human

var main = {};
var avatar;
var canvas,ctx;

$(document).ready(function(){
  canvas = document.getElementById("avatar");
  ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  main.resources = new Resources();

  main.loop = new LoopGame(function(){
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,64,96);

    avatar.Update();
    avatar.Draw(ctx);
  });

  avatar = new AvatarHuman({ skin : 0 , x : 32, y : 80 , scale : 2 });
  avatar.updateResources();
  avatar.changeAnim("rotate");

  main.loop.Start();
});