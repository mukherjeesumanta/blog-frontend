import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

it('Renders Footer', () => {
  render(<Footer />);
  const linkElement = screen.getByText(/Sumanta's Tech Blog/i);
  expect(linkElement).toBeInTheDocument();
  const paraElement = screen.getByText(/All Rights Reserved./i);
  expect(paraElement).toBeInTheDocument();
});
