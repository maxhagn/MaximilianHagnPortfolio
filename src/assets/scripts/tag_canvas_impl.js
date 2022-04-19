var myScript = document.createElement("script");
myScript.setAttribute("src", 'src/scripts/tag_canvas.js');
myScript.setAttribute("id", 'tagcanvas');
document.body.appendChild(myScript);

window.onload = function() {
  try {
    TagCanvas.Start('tagcanvas','tags',{
      textColour : '#000000',
      outlineThickness : 0.5,
      outlineColour : '#FE0853',
      maxSpeed : 0.06,
      freezeActive:true,
      shuffleTags:true,
      shape:'sphere',
      zoom:1,
      wheelZoom:false,
      noSelect:true,
      textFont:'Inter Regular, sans-serif',
      freezeDecel:true,
      fadeIn:2000,
      initial: [0.3,-0.1],
      depth : 1.2
    });
  } catch(e) {
    document.getElementById('myCanvasContainer').style.display = 'none';
  }
};

