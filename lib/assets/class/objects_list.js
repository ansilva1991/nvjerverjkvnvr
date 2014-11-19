function ObjectsList(){
  this.objects = [];
  this.objects_x_class = {};

  this.Start_all = function(){
    for(var i = 0; i < this.objects.length; i++){
      this.objects[i].Start();
    }
  };
  this.Update_all = function(){
    for(var i = 0; i < this.objects.length; i++){
      this.objects[i].Update();
    }
  }
  this.Draw_all = function(ctx){
    for(var i = 0; i < this.objects.length; i++){
      this.objects[i].Draw(ctx);
    }
  };
  this.mindistToAllObjects = function(point,class_object){
    var minDist = 999999;
    for(var i = 0; i < this.objects_x_class[class_object.name].length; i++){
      var obj = this.get(this.objects_x_class[class_object.name][i]);
      var d = this.distanceTo({ x: point[0], y:point[1]},obj);
      if(d < minDist){
        minDist = d;
      }
    }

    return minDist;
  };
  this.add = function(o){
    var id = this.objects.push(o) - 1;
    if(this.objects_x_class[o.constructor.name] == undefined){
      this.objects_x_class[o.constructor.name] = [];
    }
    this.objects_x_class[o.constructor.name].push(id);
    o.id = id;
  }
  this.get = function(id){
    return this.objects[id];
  };
  this.remove = function(o){
    this.objects_x_class[o.constructor.name].splice(o.id,1);
    this.objects.splice(o.id,1);
  };
  this.distanceTo = function(o,d){
    return Math.sqrt(Math.pow(d.x - o.x,2) + Math.pow(d.y - o.y,2));
  };
}