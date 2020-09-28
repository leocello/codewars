function songDecoder(song){
  return song.split('WUB').join(' ').replace(/  +/g, ' ').trim();
}
