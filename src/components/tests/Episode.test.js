import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


test("renders without error", () => {
    render(<Episode episode={ []}/>);
});

test("renders the summary test passed as prop", () => {
    render(<Episode episode={{ summary: 'testing testing 123' }} />);
    
    const summaryTest = screen.queryByText(/testing testing 123/i);

    expect(summaryTest).toBeInTheDocument();
});

test("renders default image when image is not defined", () => {
    render(<Episode episode={{ image: null }} />);
    
    const defaultImg = screen.getByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');

    expect(defaultImg).toBeInTheDocument();
});
