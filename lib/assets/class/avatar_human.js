function AvatarHuman(info){
  this.x = info.x == undefined ? 0 : info.x;
  this.y = info.y == undefined ? 0 : info.y;
  this.parent = info.parent == undefined ? -1 : info.parent;
  this.parent_dir = 0;

  this.sex = info.sex == undefined ? 'm' : info.sex;
  this.skin = info.skin == undefined ? 0 : info.skin;

  this.bitmap_skin;
  this.avatar_loading_resource = main.resources.load_resource({
    name : "avatar_loading_resource",
    type : "images",
    type_file : "png"
  });

  this.scale = info.scale == undefined ? 1 : info.scale;

  this.current_frames_sheet = 0;
  this.current_anim = "-1";
  this.frame = 0;
  this.step = 0;
  this.dir = 0;
  this.position = 0;

  this.anims = {
    idle : {
      frames_sheet : 0,
      loop : true,
      vel : 5,
      frames : [{ position : 0 }]
    },
    walk : {
      frames_sheet : 0,
      loop : true,
      vel : 3,
      frames : [
        {
          position : 1
        },
        {
          position : 2
        },
        {
          position : 3
        },
        {
          position : 2
        }
      ]
    },
    rotate : {
      frames_sheet : 0,
      loop : true,
      vel : 2,
      frames : [
        {
          dir : 0,
          position : 0
        },
        {
          dir : 1,
          position : 0
        },
        {
          dir : 2,
          position : 0
        },
        {
          dir : 3,
          position : 0
        },
        {
          dir : 4,
          position : 0
        },
        {
          dir : 5,
          position : 0
        },
        {
          dir : 6,
          position : 0
        },
        {
          dir : 7,
          position : 0
        }

      ]
    }
  };

  this.Update = function(){
    if(this.current_anim == "-1"){ return; }

    if(this.parent != -1){ this.parent_dir = this.parent.dir; }

    this.step += 0.1 * this.anims[this.current_anim].vel;
    if(this.step > 1){
      this.step = 0;
      this.frame += 1;
      if(this.frame > this.anims[this.current_anim].frames.length - 1){
        if(this.anims[this.current_anim].loop){
          this.frame = 0;
        }else{
          this.frame = this.anims[this.current_anim].frames.length - 1;
        }
      }

      this.dir = (this.anims[this.current_anim].frames[this.frame].dir == undefined) ? this.parent_dir : this.anims[this.current_anim].frames[this.frame].dir;
      this.position = this.anims[this.current_anim].frames[this.frame].position;
    }

  };

  this.Draw = function(ctx){
    ctx.save();
      ctx.translate(this.x,this.y);
      ctx.scale(this.scale,this.scale);
        //Skin
        ctx.drawImage(this.bitmap_skin,this.position * 16,this.dir * 32,16,32,-8,-26,16,32);

        //Loading
        if(this.ifLoading()){
          ctx.drawImage(this.avatar_loading_resource,-5,-16);
        }
    ctx.restore();
  };

  this.changeAnim = function(anim){
    if(this.current_anim != anim){
      this.frame = 0;
      this.step = 0;

      this.dir = (this.anims[anim].frames[0].dir == undefined) ? this.parent_dir : this.anims[anim].frames[0].dir;
      this.position = this.anims[anim].frames[0].position;

      if(this.current_frames_sheet != this.anims[anim].frames_sheet){
        this.current_frames_sheet = this.anims[anim].frames_sheet;
        this.updateResources();
      }

      this.current_anim = anim;
    }
  }

  this.updateResources = function(){
    //Skin
    this.bitmap_skin = main.resources.load_resource({
      name : this.current_frames_sheet + "_skin_" + this.skin + "_" + this.sex,
      type : "images",
      type_file : "png"
    });
  };

  this.ifLoading = function(){
    if(!this.bitmap_skin.complete){
      return true;
    }
    return false;
  };

  this.changeAttr = function(info){
    var change = false;

    for(var key in info){
      if(this[key] != undefined){
        if(this[key] != info[key]){
          this[key] = info[key];
          change = true;
        }
      }
    }
    if(change){ this.updateResources(); }
  }

  //These methods only works if no parent
  this.turnLeft = function(){
    if(this.parent != -1){ return; }
    this.parent_dir += 1;
    if(this.parent_dir > 7){ this.parent_dir = 0; }
  };
  this.turnRight = function(){
    if(this.parent != -1){ return; }
    this.parent_dir -= 1;
    if(this.parent_dir < 0){ this.parent_dir = 7; }
  };
}