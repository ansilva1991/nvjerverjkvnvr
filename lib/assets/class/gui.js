function GUI(){
  this.initSurvivors = function(){
    var survivors = main.gamemotor.objects.survivors();

    for( var i = 0; i < survivors.length; i++){
      var tmp = $('#example_gui_face_survivor').clone().insertAfter('#example_gui_face_survivor');
      tmp.attr('id',null);
      tmp.attr('data-id',survivors[i].id);
      tmp.show();
    }
  };
}