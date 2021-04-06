import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Paginator from './Paginator';

test('Displays Project Information', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const onChange = (items: number[]) => {}

  render(<Paginator items={items} onChange={onChange} />);
  expect(screen.getByText(/Items per Page/i)).toBeInTheDocument()
  expect(screen.getByText(/Current Page/i)).toBeInTheDocument()
  expect(screen.getByText(/10/i)).toBeInTheDocument() // Check items works
});

test('Gets correct items visible items', async () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  let visibleItems: number[] | null = null
  const onChange = (items: number[]) => { visibleItems = items }

  render(<Paginator items={items} onChange={onChange} />);
  await waitFor(() => {
    expect(visibleItems).toEqual([1, 2, 3, 4, 5, 6])
  })
});
