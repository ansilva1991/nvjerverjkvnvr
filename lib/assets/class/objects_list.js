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
      this.defineSortForm(o.constructor.name);
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
  this.defineSortForm = function(klass){
    this[owl.pluralize(klass.toLowerCase())] = function(){
      var t = [];
      for(var i = 0; i < this.objects_x_class[klass].length; i++){
        t.push(this.objects[this.objects_x_class[klass][i]])
      }
      return t;
    }
  };
  this.setInMask = function(mask,klasses,opt){
    if(opt == undefined){ opt = {}; }
    var tmp_mask = [];
    for(var i = 0; i < mask.length; i++){
      tmp_mask.push(mask[i].slice(0));
    }
    for(var i = 0; i < klasses.length; i++){
      for(var j = 0; j < this.objects_x_class[klasses[i]].length; j++){
        var xx = Math.floor(this.objects[this.objects_x_class[klasses[i]][j]].x/(main.gamemotor.map.grid/3));
        var yy = Math.floor(this.objects[this.objects_x_class[klasses[i]][j]].y/(main.gamemotor.map.grid/3));
        if(opt.force_open != undefined){
          if((xx == opt.force_open[0]) && (yy == opt.force_open[1])){
            tmp_mask[yy][xx] = 0;
            continue;
          }
        }
        if(opt.detect_survivors != undefined){
          tmp_mask[yy][xx] = 1;
        }
        else{
          tmp_mask[yy][xx] = 2;
        }
      }
    }
    return tmp_mask;
  };
  this.ifSurvivorIn = function(point,id){
    var square = main.gamemotor.map.grid/3;
    for(var i = 0; i < this.survivors().length; i++){
      if(this.survivors()[i].id == id){ continue; }
      var xx = Math.floor(this.survivors()[i].x/square);
      var yy = Math.floor(this.survivors()[i].y/square);

      if((xx == point[0]) && (yy == point[1])){
        return true;
      }
    }
    return false;
  };
}