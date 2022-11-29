import { render, screen } from '@testing-library/react';
import About from '../About';

it('Testing image and description', () => {
  render(<About />);
  const paraText = screen.getByText(/Takimata lorem et ut et diam amet dolor gubergren/i);
  expect(paraText).toBeInTheDocument();

  const aboutImage = screen.getByAltText(/About Image/i)
  expect(aboutImage).toBeInTheDocument();
});
it('Test skills bars', () => {
  render(<About />);
  const text1 = screen.getByText(/Storytelling/i)
  const text2 = screen.getByText(/Team leading/i)
  const text3 = screen.getByText(/Programming/i)

  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
  expect(text3).toBeInTheDocument();
});
