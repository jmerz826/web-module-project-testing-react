import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const sampleShow = {
    name: 'example show',
    summary: 'some summary here',
    seasons: [
        {
            name: 'Season 1',
            id: 0,
            episodes: []
        },
        {
            name: 'Season 2',
            id: 1,
            episodes: []
        }
    ]
};


test('renders without errors with no props', ()=>{
    render(<Display />);
});

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(sampleShow);
    render(<Display />);

    const btn = screen.getByRole('button');

    userEvent.click(btn);

    await waitFor(() => {
      const showComponent = screen.queryByTestId("show-container");

      expect(showComponent).toBeInTheDocument();
    });

    
});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(sampleShow);

    render(<Display />);

    const btn = screen.getByRole('button');

    userEvent.click(btn);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');

        expect(seasonOptions).toHaveLength(2);
    })
});

test('displayFunc is called when the fetch button is pressed', async () => {
    mockFetchShow.mockResolvedValueOnce(sampleShow);
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc} />);
    const btn = screen.getByRole('button');
    userEvent.click(btn);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })

});