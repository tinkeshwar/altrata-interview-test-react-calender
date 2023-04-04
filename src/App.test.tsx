import { render, screen } from '@testing-library/react';
import App from './App';

const setup = () => {
  const utils = render(<App />)
  const input = screen.getByLabelText('Date Input') as HTMLInputElement
  return {
    input,
    ...utils,
  }
}

test('date input type', () => {
  const {input} = setup()
  expect(input.type).toBe('date')
});
