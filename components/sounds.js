Crafty.c('Sounds', {
  init: function() {
    var sounds = {
      'Conceive': 'audio/conceive.mp3',
      'Birth':    'audio/cry0.mp3'
    };
    for (var s in sounds) {
      Crafty.audio.add(s, sounds[s]);
      (function(en, event){
        en.bind(event, function() {
          Crafty.audio.play(event, 1, 0.1);
        });
      }(this, s));
    }
  }
});