/**
 * Take an array and split it into rougly equal sized chunks
 *
 * @param array The array to be split up
 * @param chunks The number of chunks to split the array into
 * @returns An array of arrays chunked into roughly equal sizes
 */
export function splitArrayIntoChunks<T>(array: T[], chunks: number): T[][] {
  if (chunks <= 0) {
    throw new Error('The number of chunks must be at least 1')
  }

  const chunkSize = Math.ceil(array.length / chunks)
  if (chunkSize > 0) {
    const res = Array.from(new Array(chunks).keys())
      .map(chunk => array.slice(chunk * chunkSize, (chunk + 1) * chunkSize))

    while (res.length < chunks) {
      res.push([])
    }

    return res
  } else {
    return []
  }
}
