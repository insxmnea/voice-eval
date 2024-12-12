const calculateWER = (reference: string, hypothesis: string) => {
  const refWords = reference.split(" ");
  const hypWords = hypothesis.split(" ");

  const distance = levenshtein(refWords, hypWords);
  return (distance / refWords.length).toFixed(2);
};

function levenshtein(a: string[], b: string[]) {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

const calculateBLEU = (reference: string, hypothesis: string) => {
  const refWords = reference.split(" ");
  const hypWords = hypothesis.split(" ");

  let matches = 0;
  for (let i = 0; i < Math.min(refWords.length, hypWords.length); i++) {
    if (refWords[i] === hypWords[i]) matches++;
  }

  return (matches / refWords.length).toFixed(2);
};

export { calculateWER, calculateBLEU };
