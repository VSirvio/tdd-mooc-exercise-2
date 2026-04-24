export function composeOver(overlay, background, overlayLocation) {
  const overlayX = overlayLocation.getX();
  const overlayY = overlayLocation.getY();

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

export function duplicateOf(arr) {
  if (Array.isArray(arr[0])) {
    if (Array.isArray(arr[0][0])) {
      return arr.map(innerArr => innerArr.map(row => [...row]));
    } else {
      return arr.map(row => [...row]);
    }
  } else {
    return [...arr];
  }
}

export function multiple2DArraysFromString(str) {
  const lines = str.split("\n");
  const splitLines = lines.map(line => line.trim().split(/\s+/));
  const stringArrays = transpose(splitLines);
  return stringArrays.map(arr => arr.map(row => Array.from(row)));
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
