import { render, screen } from '@testing-library/react';
import ComponentToSnapshot from './ComponentToSnapshot';

xtest(`Snapshot ComponentToTest`, () => {
    expect(render(<ComponentToSnapshot />)).toMatchSnapshot();
});

describe(`ComponentToSnapshot props render tests`, () => {

    test(`title prop is rendered`, () => {
        // Arrange
        const testValue = `Test Heading`;
        render(<ComponentToSnapshot title={testValue} />);

        //Act
        const result = screen.getByText(testValue);

        // Assert
        expect(result).toBeInTheDocument();
    })
});