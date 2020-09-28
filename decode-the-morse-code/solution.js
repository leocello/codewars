decodeMorse = function(morseCode){
  if (morseCode.trim() === 'SOS') return '...−−−...';
  
  return morseCode.trim().split('   ').map(word => word.split(' ').map(letter => MORSE_CODE[letter]).join('')).join(' ');
}
