import React, { useRef, useEffect } from 'react';
import Point from './types';
import Tendril from './Tendril';
import HueOscillator from './HueOscillator';

/**
 * Originally npm package from: 
 * https://www.npmjs.com/package/react-dancing-lines?activeTab=readme
 * 
 * Tranformed all files to javascript
 * Original package did not work for newest React-version
 * Added gradient background-color possibility to set for canvas
 * Added lineWidth props
 * 
 */

function DancingLines(props) {
  const {
    debug = false,
    friction = 0.5,
    trails = 20,
    size = 50,
    dampening = 0.25,
    tension = 0.98,
    backgroundColor = 'rgb(8,5,16)',
    linearGradientStops = [],
    linearGradientColors = [],
    lineWidth = 1,
  } = props;


  const canvasRef = useRef();
  const targetRef = useRef({ x: 0, y: 0 });
  const tendrilsRef = useRef([]);
  const runningRef = useRef(false);
  const frameRef = useRef(0);

  const hue = new HueOscillator({
    phase: Math.random() * Math.PI * 2,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });


  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (fn) {
      window.setTimeout(fn, 1000 / 60);
    };



  const init = (event) => {
    debug && console.log('init');
    document.removeEventListener('mousemove', init);
    document.removeEventListener('touchstart', init);

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('touchmove', mousemove);
    document.addEventListener('touchstart', touchstart);

    mousemove(event);
    reset();
    loop();
  };

  /**
   * Reset all the tendrils
   */
  const reset = () => {
    debug && console.log('reset');
    const tendrils = [];

    for (let i = 0; i < trails; i++) {
      tendrils.push(
        new Tendril({
          spring: 0.45 + 0.025 * (i / trails),
          size,
          tension,
          dampening,
          friction,
          targetRef,
          canvasRef,
        }),
      );
    }
    tendrilsRef.current = tendrils;
  };

  const setColor = () => {
    const ctx = canvasRef.current.getContext('2d');

    if (linearGradientStops.length > 0 && linearGradientColors.length > 0) {
      var gradient = ctx.createLinearGradient(...linearGradientStops);

      linearGradientColors.forEach(e => {
        gradient.addColorStop(e.stop, e.color)
      })

      // Set the fill style and draw a rectangle
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = backgroundColor;
    }


  }

  /**
   * Loop the colors of tendrils
   */
  const loop = () => {
    debug && console.log('loop');

    if (!runningRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    const tendrils = tendrilsRef.current;
    const frame = frameRef.current;

    ctx.globalCompositeOperation = 'source-over';


    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'lighter';


    ctx.strokeStyle = 'hsla(' + Math.round(hue.update()) + ',100%,20%,0.25)';
    ctx.lineWidth = lineWidth;

    if (frame % 60 == 0) {
      debug && console.log(hue.update(), Math.round(hue.update()), hue.phase, hue.offset, hue.frequency, hue.amplitude);
    }

    for (let i = 0, tendril; i < trails; i++) {
      tendril = tendrils[i];
      tendril.update();
      tendril.draw();
    }

    frameRef.current = frame + 1;
    requestAnimationFrame(loop);
  };

  /**
   * Adjust canvas size when the window gets resized
   */
  const resize = () => {
    debug && console.log('resize');

    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    setColor()
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  /**
   * Start to loop the animation
   */
  const start = () => {
    debug && console.log('start');
    if (!runningRef.current) {
      runningRef.current = true;
      loop();
    }
  };

  /**
   * Stop the running state
   */
  const stop = () => {
    debug && console.log('stop');
    runningRef.current = false;
  };

  const mousemove = (event) => {
    debug && console.log('mousemove');
    if (event instanceof TouchEvent) {
      targetRef.current.x = event.touches[0].pageX;
      targetRef.current.y = event.touches[0].pageY;
    } else {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
    }
  };

  const touchstart = (event) => {
    debug && console.log('touchstart');
    if (event.touches.length == 1) {
      targetRef.current.x = event.touches[0].pageX;
      targetRef.current.y = event.touches[0].pageY;
    }
  };

  /**
   * Attach all events to window object
   */
  useEffect(() => {
    debug && console.log('useEffect');
    setColor()
    if (!canvasRef.current) {
      return;
    }

    runningRef.current = true;
    frameRef.current = 1;

    document.addEventListener('mousemove', init);
    document.addEventListener('touchstart', init);
    document.body.addEventListener('orientationchange', resize);
    window.addEventListener('resize', resize);
    window.addEventListener('focus', start);
    window.addEventListener('blur', stop);

    resize();

    return () => {
      document.removeEventListener('mousemove', init);
      document.removeEventListener('touchstart', init);
      document.body.removeEventListener('orientationchange', resize);
      window.removeEventListener('resize', resize);
      window.removeEventListener('focus', start);
      window.removeEventListener('blur', stop);
    };
  }, [canvasRef.current]);

  const styles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  return <canvas ref={canvasRef} style={styles} />;
}

export default DancingLines;