var c = document.getElementById('canv'),
  $ = c.getContext('2d'),
  w = c.width = window.innerWidth-120 ,
  h = c.height = window.innerHeight,
  t = 0, num = 850, 
  s, a, b, u=0,
  x, y, _x, _y,note = 4,
  _t = 1 / 20; 

var piano = document.getElementById('piano');
var keys = piano.children = new Object();

piano.addEventListener('click', function(e){
  if(e.target && e.target.nodeName == "LI") {
      note = e.target.id;
      var on = document.querySelector('.on'); // Using a class instead, see note below.
      on.className = "";
      document.getElementById(note).className = "on";
  }
});
console.log(note);
var anim = function() {
  $.globalCompositeOperation = 'destination-in';
  $.fillStyle = 'hsla(300, 100%, 0%, .7)';
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = 'lighter';
  for (var i = 0; i < 1; i++) {
    x = 0; _u = (u*5)+(10*i), col = u +(_u*6); 
    $.beginPath();
    for (var j = 0; j < num; j++) {
      x -= Math.PI/note * Math.sin(30);
      y = x * Math.sin(i + 0.6 * t + x /15)/20;
      _x = x * Math.cos(b) - y * Math.sin(b);
      _y = x * Math.sin(b) + y * Math.cos(b);
      b = (j*22) * Math.PI /20.9;
      $.arc(w / 2- _x, h / 2 -_y, .5, 0, Math.PI*note);
      $.lineWidth = 0.1;
    }
    var g = $.createLinearGradient(w / 2 + _x, h / 2 + _y, 1, w / 2 + _x, h / 2 + _y);
    g.addColorStop(0.1, 'hsla(0,90%,50%,0.3)');
    g.addColorStop(0.5, 'hsla('+_u+',90%,50%,0.3)');
    g.addColorStop(1, 'hsla('+x+',100%,50%,0.6)'); 
    $.strokeStyle = g;
    $.stroke();
  }
  t += _t;
  u-=.2;
  window.requestAnimationFrame(anim); //animates within loop
};
anim();

window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);