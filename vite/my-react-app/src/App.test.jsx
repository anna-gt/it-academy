import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders learn vite ', () => {
  render(<App />);
  const HelloElem = screen.getByText(/hello world/i);
  expect(HelloElem).toBeInTheDocument();
});
