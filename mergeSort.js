
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)));
  const right = mergeSort(arr.slice(Math.floor(arr.length / 2)));
  const sorted = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sorted.push(left[i++]);
    } else {
      sorted.push(right[j++]);
    }
  }

  return sorted.concat(left.slice(i), right.slice(j));
}

console.log(mergeSort([4,2,9,3]));