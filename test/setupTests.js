import '@testing-library/jest-dom';

jest.mock('../src/data/util/request', () => ({
  doRequest: jest.fn(),
}));
