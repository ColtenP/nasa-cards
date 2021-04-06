import { splitArrayIntoChunks } from './arrays'

test('splitArrayIntoChunks can handle an array of inputs', () => {
  // Test an empty array, should return an empty array
  expect(splitArrayIntoChunks([], 1)).toEqual([])

  // Test an array with one item, but wanting two chunks
  expect(splitArrayIntoChunks([1], 2)).toEqual([[1], []])

  // Test an array with three items, but wanting 4 chunks
  expect(splitArrayIntoChunks([1, 2, 3, 4], 4)).toEqual([[1], [2], [3], [4]])

  // Test an array with six items, but wanting 2 chunks
  expect(splitArrayIntoChunks([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2, 3], [4, 5, 6]])

  // Test an array, but wanting -1 chunks, should error
  expect(() => splitArrayIntoChunks([1, 2, 3], -1)).toThrow('The number of chunks must be at least 1')
});
