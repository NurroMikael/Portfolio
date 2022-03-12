import React from "react";

let Point = {
    x: Number,
    y: Number
}

let tendrilOptions = {
    spring: Number,
    friction: Number,
    size: Number,
    dampening: Number,
    tension: Number,
    targetRef: React.MutableRefObject,
    canvasRef: React.RefObject,
}


let HueOscillatorOptions = {
    phase: Number,
    offset: Number,
    frequency: Number,
    amplitude: Number
}


export default {
    Point, tendrilOptions, HueOscillatorOptions
}

