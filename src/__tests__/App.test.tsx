import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Add a basic assertion to make the test pass
    expect(document.body).toBeTruthy();
    // Use screen to verify the app rendered
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });
}); 