export function stringFrom2DArray(arr) {
  return arr.map(row => row.join("")).join("\n") + "\n";
}

export function transpose(arr) {
  return arr[0].map((_, i) => arr.map(row => row[i]));
}
