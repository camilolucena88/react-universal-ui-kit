import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from "./Header";

test('renders header text', () => {
  render(<Header />);
  const linkElement = screen.getByText("Welcome to the Header!");
  expect(linkElement).toBeInTheDocument();
});
