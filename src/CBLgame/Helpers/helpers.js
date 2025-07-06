export const getRandomExcluding = (exclude) => {

  const options = Array.from({ length: 16 }, (_, i) => i).filter(n => n !== exclude);
  const idx = Math.floor(Math.random() * options.length);
  return options[idx];

};