import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

test('Loading text is visible on screen', () => {
  render(<Loader />);
  const itemsPerPage = screen.getByText(/Loading/i);
  expect(itemsPerPage).toBeInTheDocument();
});

test('Image tag is on screen', () => {
  const { container } = render(<Loader/>)
  const svgImg = container.querySelector('img')
  expect(svgImg).toBeInTheDocument()
})
