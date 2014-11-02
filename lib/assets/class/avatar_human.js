function AvatarHuman(info){
  this.x = info.x == undefined ? 0 : info.x;
  this.y = info.y == undefined ? 0 : info.y;
  this.parent_dir = 0;

  this.skin = info.skin == undefined ? 0 : info.skin;

  this.bitmap_skin;

  this.scale = info.scale == undefined ? 1 : info.scale;

  this.current_anim = "-1";
  this.frame = 0;
  this.step = 0;
  this.dir = 0;
  this.position = 0;

  this.anims = {
    rotate : {
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
      ctx.drawImage(this.bitmap_skin,this.position * 32,this.dir * 48,32,48,-16,-40,32,48);
    ctx.restore();
  };

  this.changeAnim = function(anim){
    if(this.current_anim != anim){
      this.frame = 0;
      this.step = 0;

      this.dir = (this.anims[anim].frames[0].dir == undefined) ? this.parent_dir : this.anims[anim].frames[0].dir;
      this.position = this.anims[anim].frames[0].position;

      this.current_anim = anim;
    }
  }

  this.updateResources = function(){
    //Skin
    this.bitmap_skin = main.resources.load_resource({
      name : "skin_" + this.skin + "_m",
      type : "images",
      src : "skin_" + this.skin + "_m.png"
    });
  };
}