function Survivor(info){
  this.x = info.x;
  this.y = info.y;

  this.avatar = new AvatarHuman({ skin : 0 });
  this.Start = function(){
    this.avatar.updateResources();
  };
  this.Update = function(){
    this.avatar.x = this.x;
    this.avatar.y = this.y;

    this.avatar.Update();
  };
  this.Draw = function(ctx){
    this.avatar.Draw(ctx);
  };
}