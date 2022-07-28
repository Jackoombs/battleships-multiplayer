const shipTiles = (coordinate, length) => {
  const baseTile = coordinate - Math.round(length / 2) + 1;

  const tiles = [...Array(length)].map((e, i) => {
    return baseTile + i;
  });

  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] < 0) {
      tiles[i] = Math.max(...tiles) + 1;
    } else if (tiles[i] > 9) {
      tiles[i] = Math.min(...tiles) - 1;
    }
  }

  return tiles.sort(function (a, b) {
    return a - b;
  });
};

export default shipTiles;
