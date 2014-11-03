function LoopGame(loop_actions){

  this.loop_actions = loop_actions;
  this.last_loop = 0;

  this.Start = function(){
    this.repeat();
  }
  this.repeat = function(){
    var d = new Date();
    var dif = d.getTime() - main.loop.last_loop;

    if(dif >= (1000/30)-1)
    {
      main.loop.last_loop = d.getTime();
      main.loop.loop_actions();
    }
    requestAnimationFrame(main.loop.repeat);
  }
}