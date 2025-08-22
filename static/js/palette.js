// var clipboard = new ClipboardJS('.swatch-container');

// clipboard.on('success', function(e) {
//     console.info('Action:', e.action);
//     console.info('Text:', e.text);
//     console.info('Trigger:', e.trigger);

//     e.trigger.classList.add('swatch-container--selected');

//     e.trigger.addEventListener('mouseout', function() {
//         setTimeout(function() {
//             e.trigger.classList.remove("swatch-container--selected");
//         }, 201);
//     });

//     e.clearSelection();
// });

// clipboard.on('error', function(e) {
//     console.error('Action:', e.action);
//     console.error('Trigger:', e.trigger);
// });

var colourToggle = document.querySelectorAll('.colour-toggle');
var swatchText = document.querySelectorAll('.palette-wrapper');

for(var i=0; i<colourToggle.length; i++) {
    console.log(colourToggle[i], i);
    console.log(swatchText[i], i);

    colourToggle[i].addEventListener('click', function(i) {
        for(var j = 0; j < colourToggle.length; j++) {
            swatchText[j].classList.toggle('rgb-view');
            colourToggle[j].classList.toggle('active');
        }
    })
}
