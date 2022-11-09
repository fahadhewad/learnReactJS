import { render, screen } from '@testing-library/react';
import TodoForm from '../Components/TodoForm';

// Provide mock implementation for DateCreated component
jest.mock("../Components/utils/DateCreated", () => {
    return function MockDateCreated() {
        return <span data-testid="dateCreated">Date Created Component</span>
    }
});

describe(`TodoForm test suite`, () => {

    beforeEach(() => {
        render(<TodoForm />);
    });

    test(`it should render a Description input and label`, () => {
        expect(screen.getByPlaceholderText(`Todo Description`)).toBeInTheDocument();
    });

    test(`it should render a Completed input and label`, () => {
        expect(screen.getByLabelText(`Completed:`)).toBeInTheDocument();
    });

    test(`it should render a DateCreated component a date`, () => {

        expect(screen.getByTestId(`dateCreated`).textContent).toContain(`Date Created Component`);
    });

    test(`it should render a Submit button`, () => {
        expect(screen.getByText(`Submit`)).toBeInTheDocument();
    });
});