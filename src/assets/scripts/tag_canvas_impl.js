function initCanvas() {
  try {
    const myScript = document.createElement("script");
    myScript.setAttribute("src", '/assets/scripts/tag_canvas.js');
    myScript.setAttribute("id", 'tagcanvas');
    document.body.appendChild(myScript);

    TagCanvas.Start('tagcanvas', 'tags', {
      textColour: '#FFFFFF',
      outlineThickness: 0.5,
      outlineColour: '#FE0853',
      maxSpeed: 0.02,
      freezeActive: false,
      shuffleTags: true,
      shape: 'sphere',
      zoom: 1,
      wheelZoom: false,
      noSelect: true,
      noMouse: true,
      textFont: 'Inter-Regular, sans-serif',
      noTagsMessage: false,
      fadeIn: 2000,
      initial: [0.3, -0.1],
      depth: 1.2
    });
  } catch (e) {
    document.getElementById('myCanvasContainer').style.display = 'none';
  }
}



