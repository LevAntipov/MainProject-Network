import { render, screen } from '@testing-library/react';
import SocialNetwork from './App';

test('renders learn react link', () => {
  // render(<SocialNetwork />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  const container = document.createElement('div');
    const root = createRoot(container); 
    root.render(<SocialNetwork  tab="home" />);
    root.unmount();
});
