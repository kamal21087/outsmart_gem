const findCloseEnough = (answer: string, sentence: string): boolean => {
  
    const sentenceWords = sentence.split(" ");
  
    // Check if any word in the sentence is close enough to the answer
    for (const sentenceWord of sentenceWords) {
        if (areStringsCloseEnough(answer, sentenceWord)) {
          return true;
        }
      }
  
    return false;
}

// function to determine whether if two strings are close enough to be considered the same
// This function is useful for comparing user input to a list of valid options
function areStringsCloseEnough(
    str1: string,
    str2: string,
    threshold: number = 0.8
  ): boolean {
    // Helper function: Calculate Levenshtein Distance
    const levenshteinDistance = (a: string, b: string): number => {
      const matrix: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
        Array(b.length + 1).fill(0)
      );
  
      for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
      for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1, // Deletion
            matrix[i][j - 1] + 1, // Insertion
            matrix[i - 1][j - 1] + cost // Substitution
          );
        }
      }
  
      return matrix[a.length][b.length];
    };
  
    // Normalize strings (case insensitive, trim spaces)
    const normalizedStr1 = str1.trim().toLowerCase();
    const normalizedStr2 = str2.trim().toLowerCase();
  
    // If strings are equal after normalization, they are close enough
    if (normalizedStr1 === normalizedStr2) return true;
  
    // Calculate Levenshtein Distance and similarity ratio
    const distance = levenshteinDistance(normalizedStr1, normalizedStr2);
    const maxLength = Math.max(normalizedStr1.length, normalizedStr2.length);
    const similarity = 1 - distance / maxLength;
  
    // Strings are close enough if similarity meets or exceeds the threshold
    return similarity >= threshold;
  }
  
  export default findCloseEnough;