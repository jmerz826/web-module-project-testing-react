import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';
import Loading from '../Loading';

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

test('renders without errors', () => {
    render(<Show show={sampleShow} selectedSeason={ 'none'}/>);
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);

    const loading = screen.queryByTestId('loading-container');

    expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', () => {
    render(<Show show={sampleShow} selectedSeason={'none'}/>);

    const options = screen.queryAllByTestId('season-option');

    expect(options).toHaveLength(2);
});

test('handleSelect is called when an season is selected', () => {
    const handleSeasonSelect = jest.fn();

    render(<Show show={sampleShow} selectedSeason={'none'} handleSelect={ handleSeasonSelect}/>);
    
    const selector = screen.getByLabelText('Select A Season');

    userEvent.selectOptions(selector, ['1']);7410
    expect(handleSeasonSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={sampleShow} selectedSeason={'none'} />);
    
    let episodes = screen.queryByTestId('episodes-container');

    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={sampleShow} selectedSeason={1} />);

    episodes = screen.queryByTestId('episodes-container');

    expect(episodes).toBeInTheDocument();

});
