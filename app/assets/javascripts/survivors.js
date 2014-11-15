//= require gameloop
//= require resources
//= require avatar_human

var canvas = document.getElementById("avatar");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

var main = {};
main.resources = new Resources();

main.loop = new GameLoop(function(){
  ctx.fillStyle = "#fff";
  ctx.fillRect(0,0,64,96);

  avatar.Update();
  avatar.Draw(ctx);
});

var avatar = new AvatarHuman({ skin : 0 , x : 16, y : 52 , scale : 2 });
avatar.parent_dir = 7;
avatar.updateResources();
avatar.changeAnim("idle");

main.loop.Start();

//GUI
$('.change_sex').click(function(){
  avatar.changeAttr({ sex : $(this).val() });
});
$('.change_skin').click(function(){
  avatar.changeAttr({ skin : $(this).val() });
});
