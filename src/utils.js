//https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function getNewDeck() {
  let deck = [...Array(81)].map((x,i)=>i)
  shuffle(deck);
  return deck
}

module.exports = {
  getNewDeck
}
