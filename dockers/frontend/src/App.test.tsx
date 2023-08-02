import { render, screen } from '@testing-library/react';
import App from './App';
import { formatTimestamp } from './constant/functionToolbox';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// 單元測試時間格式化函式
describe('formatTimestamp', () => {
  it('should format timestamp correctly', () => {
    const timestamp = 1626784800; // Sample timestamp value (2021-07-20 12:00:00)
    const formattedTimestamp = formatTimestamp(timestamp);
    expect(formattedTimestamp).toBe('2021/07/20\n12:00');
  });

  it('should return "- -" for invalid or missing timestamp', () => {
    const invalidTimestamp = undefined;
    const formattedInvalidTimestamp = formatTimestamp(invalidTimestamp);
    expect(formattedInvalidTimestamp).toBe('- -');
  });
});