export function stringFrom2DArray(arr) {
  let result = '';
  for (let y = 0; y < arr.length; ++y) {
    for (let x = 0; x < arr[0].length; ++x) {
      result += arr[y][x];
    }
    result += "\n";
  }
  return result;
}
