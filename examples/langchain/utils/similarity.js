/**
 * @file utils/similarity.js
 * @description Utility functions for similarity calculations.
 */

/**
 * Function to find the top K similar documents based on cosine similarity
 */
function findTopKSimilarDocuments(
  queryEmbedding,
  vectors,
  data,
  k = 4,
  threshold = 0.3,
) {
  const cosineSimilarity = (a, b) => {
    const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  };

  const similarities = vectors.map((vector, index) => ({
    similarity: cosineSimilarity(queryEmbedding, vector),
    document: data[index],
  }));

  similarities.sort((a, b) => b.similarity - a.similarity);

  // Filter documents based on the threshold
  const filteredDocuments = similarities.filter(
    (item) => item.similarity >= threshold,
  );

  return filteredDocuments.slice(0, k).map((item) => item.document);
}

module.exports = { findTopKSimilarDocuments };
