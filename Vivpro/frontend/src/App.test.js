
// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import App from './App'; // Adjust the import according to your file structure
// import { act } from 'react'; // Importing act from react

// // Mocking fetch API
// beforeEach(() => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve([{ id: 1, title: 'Song 1' }, { id: 2, title: 'Song 2' }]),
//     })
//   );
// });

// afterEach(() => {
//   jest.clearAllMocks(); // Clearing mocks after each test
// });

// test('renders loading message initially', () => {
//   render(<App />);
//   expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Change based on your loading text
// });

// test('fetch is called once when the component mounts', async () => {
//   await act(async () => {
//     render(<App />);
//   });

//   expect(global.fetch).toHaveBeenCalledTimes(1); // Ensure fetch is called once
// });

// test('renders songs after fetch', async () => {
//   render(<App />);

//   // Wait for songs to be rendered
//   await waitFor(() => {
//     expect(screen.getByText('Song 1')).toBeInTheDocument();
//     expect(screen.getByText('Song 2')).toBeInTheDocument();
//   });
// });

// test('renders error message when fetch fails', async () => {
//   // Mock fetch to reject
//   global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));

//   render(<App />);

//   // Wait for error message to be displayed
//   await waitFor(() => {
//     expect(screen.getByText(/could not fetch any songs/i)).toBeInTheDocument(); // Adjust based on your error message
//   });
// });
