import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import LogoutButton from '../components/LogoutButton';

describe("LogoutButton component", () => {
    test("Rendering LogoutButton Component", () => {
        render(<LogoutButton />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test("Changing background of LogoutButton component", () => {
        render(<LogoutButton/>);
        const buttonElement = screen.getByRole("button");
        fireEvent.mouseOver(buttonElement);
        expect(buttonElement).toHaveStyle("background-color: #7a7a7a");
        fireEvent.mouseOut(buttonElement);
        expect(buttonElement).toHaveStyle("background-color: #555555");
    });
});
