/**
 * Generate a simple text embedding vector for semantic search.
 * Uses a hash-based approach to create a 384-dim vector from text.
 * Not as good as real ML embeddings but works without external APIs.
 */
export function generateEmbedding(text: string): number[] {
  const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, '')
  const words = normalized.split(/\s+/).filter(Boolean)
  const vector = new Array(384).fill(0)

  for (const word of words) {
    // Hash each word to multiple vector positions
    for (let i = 0; i < word.length; i++) {
      const hash = (word.charCodeAt(i) * 31 + i * 17 + word.length * 7) % 384
      vector[hash] += 1
    }
    // Also hash bigrams
    for (let i = 0; i < word.length - 1; i++) {
      const bigram = word.charCodeAt(i) * 256 + word.charCodeAt(i + 1)
      vector[bigram % 384] += 0.5
    }
  }

  // L2 normalize
  const magnitude = Math.sqrt(vector.reduce((sum: number, v: number) => sum + v * v, 0))
  if (magnitude > 0) {
    for (let i = 0; i < vector.length; i++) {
      vector[i] /= magnitude
    }
  }

  return vector
}

/**
 * Format embedding as a Postgres vector literal string: [0.1,0.2,...]
 */
export function embeddingToString(embedding: number[]): string {
  return `[${embedding.join(',')}]`
}
