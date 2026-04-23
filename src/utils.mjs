export function composeOver(overlay, background, overlayLocation, overlayLocation2) {
  const overlayX2 = overlayLocation2.getX();
  const overlayY2 = overlayLocation2.getY();

  const result = background.map(row => [...row]);
  for (let y = 0; y < overlay.length && overlayY2 + y < result.length; ++y) {
    for (let x = 0; x < overlay[0].length && overlayX2 + x < result[0].length; ++x) {
      if (overlay[y][x] !== '.') {
        result[overlayY2 + y][overlayX2 + x] = overlay[y][x];
      }
    }
  }

  return result;
}

export function stringFrom2DArray(arr) {
  return arr.map(row => row.join("")).join("\n") + "\n";
}

export function transpose(arr) {
  return arr[0].map((_, i) => arr.map(row => row[i]));
}

export function withoutBorders(arr) {
  return arr.slice(0, -1).map(row => row.slice(1, -1));
}
