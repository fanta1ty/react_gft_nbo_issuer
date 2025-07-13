const gradients = [
  "linear-gradient(to bottom, #F59B96, #E88160)",
  "linear-gradient(to bottom, #96E78D, #5DD48D)",
  "linear-gradient(to bottom, #84CBE1, #4586E7)",
  "linear-gradient(to bottom, #8DA1E6, #8961DE)",
  "linear-gradient(to bottom, #B387DE, #D95FDB)",
  "linear-gradient(to bottom, #84EAB9, #64C3C9)",
];

export const getGradient = (combinedString: string) => {
  let hash = 0;
  for (let i = 0; i < combinedString.length; i++) {
    const char = combinedString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};
