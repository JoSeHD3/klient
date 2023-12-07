import React from 'react';
import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MarginProvider, useMargin } from '../components/MarginContext';


describe('MarginProvider', () => {
    test('Renders children with default margin', () => {
      render(
        <MarginProvider>
          <MarginConsumer />
        </MarginProvider>
      );
  
      const childElement = screen.getByTestId('child');
      expect(childElement).toHaveStyle({ marginLeft: '64px' });
    });
  
    test('Updates margin value with setMarginLeft', () => {
      render(
        <MarginProvider>
          <MarginConsumer />
        </MarginProvider>
      );
  
      const childElement = screen.getByTestId('child');
  
      act(() => {
        useMargin().setMarginLeft('100px');
      });
  
      expect(childElement).toHaveStyle({ marginLeft: '100px' });
    });
  });
  
  const MarginConsumer = () => {
    const { marginLeft } = useMargin();
    return <div data-testid="child" style={{ marginLeft }} />;
  };
  