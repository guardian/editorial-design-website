
window.onscroll = function() {

    var textSlides = document.querySelectorAll('.slide .text');

    for (var i = 0; i<textSlides.length; i++) {
        var textSlide = textSlides[i];
        var visible = checkVisible(textSlide);
        if (visible) {
            textSlide.parentElement.classList.add('on');
        } else {
            textSlide.parentElement.classList.remove('on');
        }
    }
};


function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  // var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  var viewHeight = window.innerHeight;
  return !(rect.bottom < 0 || rect.top - viewHeight >= -viewHeight/2);
}

function hamburgler() {
    var ham = document.querySelector('.gud-style__hamburger');
    var overlay = document.querySelector('.gud-style__menu_overlay')
    var section = document.getElementsByClassName('nav-link');
    ham.addEventListener('click', function(){
        this.classList.toggle('open');
        overlay.classList.toggle('open');
    });
    for(i=0; i < section.length; i++) {
        section[i].addEventListener('click', function(){
            ham.classList.toggle('open');
            overlay.classList.toggle('open');
        });
    }
}

hamburgler();

// function checkVisible(elm, threshold, mode) {
//   threshold = threshold || 0;
//   mode = mode || 'visible';
//
//   var rect = elm.getBoundingClientRect();
//   var viewHeight = window.innerHeight;
//   var above = rect.bottom - threshold < 0;
//   var below = rect.top - viewHeight + threshold >= 0;
//
//   return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
// }
