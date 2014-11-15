function ObjectsList(){
  this.objects = [];

  this.Start_all = function(){
    for(i = 0; i < this.objects.length; i++){
      this.objects[i].Start();
    }
  };
  this.Update_all = function(){
    for(i = 0; i < this.objects.length; i++){
      this.objects[i].Update();
    }
  }
  this.Draw_all = function(ctx){
    for(i = 0; i < this.objects.length; i++){
      this.objects[i].Draw(ctx);
    }
  };
  this.add = function(o){
    this.objects.push(o);
  }
}