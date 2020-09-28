function tribonacci(signature,n){
  if (n <= 0) return [];
  
  let returns = [];
  
  for (let i = 0; i < n ; i++) {
    returns.push(signature[i] !== undefined ? signature[i] : returns[i-1] + returns[i-2] + returns[i-3]);
  }
  
  return returns;
}
