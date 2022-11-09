import React from 'react';
import { render } from '@testing-library/react';
import AddEditTodo from '../Components/AddEditTodo';

describe(`Tests for AddEditTodo`, () => {

    test(`it should render a div with classNames 'addEditTodo row'`, () => {
        const { container } = render(<AddEditTodo />);
        const addEditTodoRow = container.querySelector(`.addEditTodo.row`);

        expect(addEditTodoRow).toBeTruthy();
    });

    test(`it should render a TodoForm`, () => {
        const { container } = render(<AddEditTodo />);
        const form = container.querySelector(`form`);

        expect(form).toBeTruthy();
    })
});
