import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideBar from '../SideBar'; 

describe('Renders Sidebar', () => {
  it('Testing description', () => {
    render(<SideBar />);
    const paraElement = screen.getByText(/Full stack engineer/i);
    expect(paraElement).toBeInTheDocument();
  });
  
  it('Testing link', async () => {
    render(<SideBar />);
    const linkElement = screen.getByText(/Hire Me/i);
    expect(linkElement).toBeInTheDocument();

    userEvent.click(linkElement)

    setTimeout(() => {
      expect(screen.getByText('Thanks for showing interest in me')).toBeInTheDocument()
    }, 100);

  });
})
