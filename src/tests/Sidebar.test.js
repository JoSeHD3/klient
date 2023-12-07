import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../components/Sidebar'; 
import { MarginProvider } from '../components/MarginContext'; 

describe('Sidebar', () => {
  test('Renders the Sidebar and responds to user interactions', () => {
    render(
      <MarginProvider>
        <Sidebar />
      </MarginProvider>
    );

    expect(screen.getByText('Strona główna')).toHaveClass('sidenav---navtext---1AE_f');

    fireEvent.click(screen.getByText('Profil'));
    expect(screen.getByText('Profil')).toHaveClass('sidenav---navtext---1AE_f');

    fireEvent.click(screen.getByText('Firma'));
    expect(screen.getByText('Firma')).toHaveClass('sidenav---navtext---1AE_f');

    fireEvent.click(screen.getByText('Zlecenie'));
    expect(screen.getByText('Zlecenie')).toHaveClass('sidenav---navtext---1AE_f');

    fireEvent.click(screen.getByText('Pomoc'));
    expect(screen.getByText('Pomoc')).toHaveClass('sidenav---navtext---1AE_f');
  });
});
