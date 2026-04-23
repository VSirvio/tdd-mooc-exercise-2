export function bottomMargin(currentBlock) {
  const arr = currentBlock;
  let blockBottomMargin = 0;
  while (blockBottomMargin < arr.length &&
      arr[currentBlock.length - blockBottomMargin - 1].match(/^[.]+$/)) {
    ++blockBottomMargin;
  }
  return blockBottomMargin;
}

export function composeOver(overlay, background, overlayLocation) {
  const [overlayX, overlayY] = overlayLocation;

  const result = background.map(row => [...row]);
  for (let y = 0; y < overlay.length && overlayY + y < result.length; ++y) {
    for (let x = 0; x < overlay[0].length && overlayX + x < result[0].length; ++x) {
      if (overlay[y][x] !== '.') {
        result[overlayY + y][overlayX + x] = overlay[y][x];
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
