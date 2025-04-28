import '@testing-library/jest-dom';

beforeEach(() => {
  jest.clearAllMocks();
});

const mockConsoleError = jest.spyOn(console, 'error');
mockConsoleError.mockImplementation(() => {});
