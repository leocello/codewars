// Adding Big Numbers
/*
We need to sum big numbers and we require your help.
Write a function that returns the sum of two numbers. The input numbers are strings and the function must return a string.

Example
add("123", "321"); -> "444"
add("11", "99");   -> "110"

Notes
    The input numbers are big.
    The input is a string of only digits
    The numbers are positives
*/
function add(a, b) {
  let result = [], arrA = a.split('').reverse(), arrB = b.split('').reverse();
  let additional = 0;
  
  for (i = 0; i < arrA.length || i < arrB.length; i++) {
    let sum = Math.ceil(!!arrA[i] ? arrA[i] : 0);
    sum += Math.ceil(!!arrB[i] ? arrB[i] : 0);
    sum += additional;
    additional = 0;
    
    if (sum >= 10) {
      sum = sum - 10;
      additional = 1;
    }
    
    result.push(sum)
  }
  
  if (additional > 0) {
    result.push(additional);
  }
  
  return result.reverse().join('');
}
