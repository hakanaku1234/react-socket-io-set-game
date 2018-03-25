/*
  exports attributes of cards as constants
  so that we avoid typos in string props
*/

export const RED = 'rgb(178, 21, 21)'
export const GREEN = 'rgb(47, 137, 15)'
export const PURPLE = 'rgb(105, 35, 175)'

export const EMPTY = 'EMPTY'
export const STRIPED = 'STRIPED'
export const SOLID = 'SOLID'

export const DIAMOND = 'DIAMOND'
export const OVAL = 'OVAL'
export const SQUIGGLE = 'SQUIGGLE'


const counts = [1,2,3]
const colors = [RED, GREEN, PURPLE]
const shades = [EMPTY, STRIPED, SOLID]
const shapes = [DIAMOND, OVAL, SQUIGGLE]

export let _DECK = []
for (let count of counts) {
  for (let color of colors) {
    for (let shade of shades) {
      for (let shape of shapes) {
        _DECK.push({ count, color, shade, shape })
      }
    }
  }
}
