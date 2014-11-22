function GUI(){
  this.Start = function(){
    var survivors = main.gamemotor.objects.survivors();

    for( var i = 0; i < survivors.length; i++){
      var tmp = $('#example_gui_face_survivor').clone().insertBefore('#example_gui_face_survivor');
      tmp.attr('id',null);
      tmp.addClass('gui_face_survivor');
      tmp.attr('data-id',survivors[i].id);
      tmp.show();
      tmp.attr('onclick','main.gamemotor.selectSurvivor(' + survivors[i].id + ')')
    }
  };
  this.Update = function(){
    $('.gui_face_survivor').each(function(){
      var id = parseInt( $(this).data('id') );
      var ctx = $(this).children()[0].getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = "#bbb;"
      ctx.fillRect(0,0,50,50);
      ctx.save();
        ctx.scale(2,2);
        main.gamemotor.objects.survivors()[id].avatar.Draw(ctx,8,25);
      ctx.restore();
    });
  };
  this.selectSurvivor = function(id){
    $('.gui_face_survivor').removeClass( "active" )
    $('.gui_face_survivor[data-id=' + id +']').addClass( "active" )
  };
}