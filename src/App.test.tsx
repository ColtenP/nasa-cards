import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Loads the Paginator', () => {
  render(<App />);
  const itemsPerPage = screen.getByText(/Items per Page/i);
  expect(itemsPerPage).toBeInTheDocument();
});

test('Does not load projects or show cards', () => {
  render(<App/>)
  const expandButton = screen.queryByText(/Expand/i)
  expect(expandButton).not.toBeInTheDocument()
})
