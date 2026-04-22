export function stringFrom2DArray(arr) {
  return arr.map(row => row.join("")).join("\n") + "\n";
}
