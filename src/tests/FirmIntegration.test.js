import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import AddTrailer from '../pages/AddTrailer';
import { MarginProvider } from '../components/MarginContext';


test('Renders NavButton in AddTrailer component', () =>{
    render(
        <MarginProvider>
            <AddTrailer />
        </MarginProvider>
        
    );

    const navButtonElement = screen.getByText("Firma");
    expect(navButtonElement).toBeInTheDocument();
});