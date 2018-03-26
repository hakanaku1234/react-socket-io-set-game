import React from 'react';

function scale(val, pct) {
  return Math.round(val * pct * 1000) / 1000
}

function Squiggle(sProps) {
  //TODO: make this squiggle scale with height and width passed into it
  /*
    this functional component serves to scale our squiggle
  */
  var cPoints = [
    [[-13, -6], [-23, -11], [-28, -26]],
    [[-5, -15], [-1, -31],  [7, -58]],
    [[7, -23],  [0, -36],   [-3,-43]],
    [[-4, -7],  [-9, -17],  [-9,-30]],
    [[0, -13],  [21, -18],  [33,-12]],
    [[11, 5],   [23, 14],   [28, 26]],
    [[5, 12],   [1, 32],    [-7, 59]],
    [[-5, 17],  [-3, 29],   [3, 42]],
    [[4, 9],    [10, 18],   [9, 30]],
    [[0, 13],   [-18, 19],  [-33, 12]],
  ]
  var pct = 0.47
  return (
    <path
      d={
        `m ${scale(43,pct)},${scale(176.4,pct)}
        ${ cPoints.map(row =>
          'c ' + row.map(point => scale(point[0]*1.2, pct) + ',' + scale(point[1], pct))
        ).join(' ') }
        z` }
      { ...sProps }
    />
  )
}

export default Squiggle
