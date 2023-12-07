import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {NavButton, OneButton} from '../components/NavButton'; 

describe('OneButton', () => {
  test('Redirects to the correct route on button click', () => {
    const route = '/comp';
    const name = 'Comp';
    render(<OneButton route={route} name={name} />);

    const buttonElement = screen.getByText(name);
    fireEvent.click(buttonElement);

    expect(route).toBe('/comp');
  });
});
