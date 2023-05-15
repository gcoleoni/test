let canvas = document.getElementById('canvas');

let outerRadius = 343; //radius of outer ring
let innerRadius = outerRadius;
let torusPoints = 8; //number of points of the circle
let waveSpeed = 2; //sine wave speed
let pointsWaveVariation = 2; //the sine wave speed difference multiplier of each point

let tweenBlob;

let resize = false;
let size, resizeTimer;

if(window.innerWidth > 686) {
  size = 343;
} else {
  size =  (window.innerWidth - 60) / 2;
}

let pointsWaveDistance = 20; //the distance each point moves


 //setup paper js
paper.setup(canvas);

// let square = new paper.Path.Rectangle({
//     position: new paper.Point(0, 0),
//     size: paper.view.bounds.width * 0.65,
//     parent: paper.originals,
//     fillColor: 'white'
// });

//setup circle paths for torus
let outerCircle = new paper.Path.RegularPolygon(new paper.Point(0, 0), torusPoints, size);
outerCircle.smooth({
  type: 'continuous'
});
outerCircle.fillColor = '#d6e9c1';

// let innerCircle = new paper.Path.RegularPolygon(new paper.Point(0, 0), torusPoints, innerRadius);
// innerCircle.smooth({
//   type: 'continuous'
// });
// innerCircle.clockwise = false; //required for compoundPath clipMask
// innerCircle.fillColor = '#fff';

//center the view
paper.view.translate(paper.view.center);

//render
paper.view.draw();



//resize events
paper.view.onResize = () => {
  paper.view.translate(paper.view.center);
  resize = true;
  
  
  
  if(window.innerWidth > 686) {
    size = 343;
  } else {
    size =  window.innerWidth / 2;
  }
  
  let temp = size <= 180 ? size : size - 50;
  
  pointsWaveDistance = temp / torusPoints;
//   outerCircle.bounds.width = window.innerWidth - 100;
//     outerCircle.bounds.height = window.innerWidth - 100;
  
  console.log(window.innerWidth, outerCircle);
  // outerCircle.fitBounds(paper.view.bounds);
  // innerCircle.fitBounds(paper.view.bounds);
  
  // square.fitBounds(paper.view.bounds);
  // square.set({ size: [400,400] })
  
  
  console.log('points',pointsWaveDistance);
 
  
  for (let i = 0;  i < outerCircle.segments.length; i++) {
      outerCircle.segments[i].point.length = size;
    }
  
  outerCircle.smooth({
  type: 'continuous'
});
  
  
  tweenBlob.restart(true, false);
  
  
  clearTimeout(resizeTimer);
      
      resizeTimer = setTimeout(() => {
        resize = false;
        
      }, 500);
};




const startAnimation = () => {

  let animVars = {
    speed: waveSpeed,
    waveVariation: pointsWaveVariation,
    waveDistance: 0
  };

  let animVarsInner = {
    speed: waveSpeed,
    waveVariation: pointsWaveVariation + 2,
    waveDistance: 0
  };
  
  tweenBlob = new TimelineMax;
  
  
  tweenBlob.to(animVars, 1, {
    speed: waveSpeed,
    waveVariation: pointsWaveVariation,
    waveDistance: pointsWaveDistance,
    ease: Sine.easeOut
  });
 
  
  // TweenMax.to(animVarsInner, 1, {
  //   speed: waveSpeed,
  //   waveVariation: pointsWaveVariation + 2,
  //   waveDistance: pointsWaveDistance - 3,
  //   ease: Sine.easeOut
  // });

  paper.view.onFrame = (e) => {
    //ring animation
    // j = innerCircle.segments.length - 1;
    for (let i = 0;  i < outerCircle.segments.length; i++) {
      let sinWave = Math.sin(e.time * animVars.speed + (i * animVars.waveVariation));
      // let sinWaveInner = Math.sin(e.time * animVarsInner.speed + (i * animVarsInner.waveVariation));



      outerCircle.segments[i].point.length = size + (sinWave * animVars.waveDistance);
    }

    paper.view.rotate(0.2);
  };
}


startAnimation();