import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavButton from '../components/NavButton'; 

describe('NavButton', () => {
  test('Renders buttons with correct names and routes', () => {
    const routes = [
      { route: '/home', name: 'Home' },
      { route: '/about', name: 'About' },
    ];

    render(<NavButton routes={routes} />);

    routes.forEach(({ route, name }) => {
      const buttonElement = screen.getByText(name);
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('col-top-nav');

      fireEvent.click(buttonElement);
      expect(window.location.href).toBe(`http://localhost${route}`);
    });
  });
});
