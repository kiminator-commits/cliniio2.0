import { render } from '@testing-library/react';
import App from '../App';

jest.mock('../contexts/UIContext', () => ({
  UIProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
}); 