import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders Button component', () => {
	render(<Button>Click Me</Button>);
	const buttonElement = screen.getByText(/click me/i);
	expect(buttonElement).toBeInTheDocument();
});