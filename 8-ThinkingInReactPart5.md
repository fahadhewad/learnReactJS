# Thinking In React – Part 5 - Adding Inverse Data Flow

## Outcomes

- To be able to use inverse data flow in applications

## Thinking in React Process

0. Start with a mock
1. Break the UI into a component hierarchy
2. Build a static version in React
3. Identify the minimal \(but complete\) representation of UI state
4. Identify where your state should live
5. **Add inverse data flow**

## 5\. Add inverse data flow

- App renders correctly as function of _props_ and _state_ flowing down hierarchy
- To support data flowing other way\, form components deep in hierarchy need to update state in __FilterableProductTable__
- Want to make sure whenever user changes form, state is updated
  - __FilterableProductTable__ needs to pass callback to __SearchBar__
    - Fires whenever state should be updated
  - Use __`onChange`__ event on inputs
    - Callback will change the state and update the application UI

---

## Calling Functions as Props

- To facilitate passing data from a child component to a parent\, the parent can supply a __callback__ to the child as props
- Child component can use the __callback__\, supplying any data required
  - Particularly useful when submitting forms and updating application state in ancestor components

```jsx
import { useState } from "react";
const Form = props => {
    const [name, setName] = useState(``);
    const handleSubmit = event => {
        event.preventDefault();
        props.handleSubmitInParent(name); // Callback supplied as
        setName(``);                      // prop in parent component
    }
    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text" name="name" value={name} 
                onChange={event => 
                setName(event.target.value)} 
            />
            <input type="submit" value="Submit" />
        </form>
    );
};
export default Form;
// Clicking the submit button calls handleSubmitInParent, passing 
// it the state value of name

```

When the __Form__ component calls the __`handleSubmitInParent`__ callback it actually calls __`addNameToList`__ from the __App__ component supplying the __`name`__ argument

This principle can be used to have a wrapping Form component around Input items, storing the state of the form in a single place

```jsx
import { useState } from "react"; 
const App = () => {
    const [names, setNames] = useState([]);
   
    const addNameToList = name => {
        const updatedNames = [...names, name]; // same as updateNames = name => { names.push(name); return names;};
        setNames(updatedNames);
        // setNames([...names, name]);
    };
  
    const nameList = names.map((name, index) =><li key={index}>{name}</li>);

    return(
        <>
            <h1>Hello people!</h1>
            <ul>{nameList}</ul>
            <h2>Add Name:</h2>
            <Form handleSubmitInParent={addNameToList} />
        </>
    );
};
export default Form;
```

---

## Testing Components that have functions as prop

To do this we need to be able to **mock functions** in Jest

- Useful for when functions are passed in as props to a component
- Allows spying on function calls to ensure that things happen

As simple as a declaration:

```jsx
    ...
    const functionToMock = jest.fn();
    ...
```

Can then be used as a prop when creating a component:

```jsx
    ...
    render(<MyComponent functionProp={functionToMock} />);
    ...
```

Asserting can then use the function matchers to check calls:

```jsx
    ...
    expect(functionToMock).toHaveBeenCalledTimes(1);
    expect(functionToMock).toHaveBeenCalledWith(testObject);
    ...
```

The important thing here is that we are not relying on the implementation of the parent component, rather that the component under test makes the call.

---

## Activity 14a -- Thinking In React Part 5 -- Adding Inverse Data Flow

### Outcomes

-  To be able to add inverse data flow to an application by passing handler functions by props

## Overview

In this activity, you will add inverse data flow to the application and ultimately update the array of todos in the App component. To start this process, in **TodoForm**, you will allow the user to submit the form, triggering a *submit handler function* on it. This will stop the default action from happening, call a function that will be passed in through its props with the **todo** values and then reset them to *empty values*.

Moving up the chain to the **AddEditTodo** component, you will create a function to pass to the **TodoForm**. This function will take the data for a new (or edited) **Todo** and generate an ID for it (using the provided **utils/generateId** function). This will create a new **todo** and call the function this component receives through props with it.

The top of this inverse data flow is the **App** component. You will define a submit handling function that receives the new **Todo** and adds it to the array of **todos** it already has. This will trigger a re-render of all components that depend on this.

Remember to refer back to the Acceptance Criteria for this part of the application too.

You may continue in the **StatefulVersion/starter** folder or extend **solution-activity13**.

# Action 1 -- Add a submit handler to TodoForm

1. Open **TodoForm.jsx** for editing.
2. Import `PropTypes` from `prop-types`.
3. At the bottom of the file, before the export statement, declare `TodoForm.propTypes` to be an *object*, it should have a **key** of `submitTodo` and a **value** of `PropTypes.func.isRequired`.
4. Make this component receive `props` by adding `{submitTodo}` to the arguments of the function.
5. In the **TodoForm** function, under the **state** declarations, add an *arrow function* called `handleSubmit` that takes an argument of `event`. The arrow function body should:
    - Call `preventDefault` on `event`;
    - Call `submitTodo` with the *3 state values*;
    - Set each of the **state** back to the *default values* initially provided.
6.  In the `form` tag, add an attribute of `onSubmit` set to `handleSubmit`.
7.  Save the file.

## Action 2 -- Add a submit handler to AddEditTodo

1. Open **AddEditTodo.jsx** for editing.
2. Import `PropTypes` from `prop-types`.
3.  At the bottom of the file, before the **export** statement, declare `AddEditTodo.propTypes` to be an *object*, it should have a **key** of `submitTodo` and a **value** of `PropTypes.func.isRequired`.
4.  Import `generateTodoId` from **'./utils/generateId'**.
5.  Import `TodoModel` from **'./utils/Todo.model'**.
6.  Make this component receive `props` by adding it to the arguments of the function.
7.  Add an *arrow function* called `submitTodo` to the component, it should:
 -   Receive `todoDescription`, `todoDateCreated` and `todoCompleted`;
 -   Define a `const` `_id` that is the result of a call to `generateTodoId`;
 -   Define a `const` called `newTodo` that calls the **constructor** for `TodoModel` with `todoDescription`, `todoDateCreated` c(converted to an ***ISO String IF it exists***), `todoCompleted` and `_id`;
 -   Call `props.submitTodo` with the `newTodo`.
8.  In the `return` of the function add an **attribute** of `submitTodo` to the **TodoForm** component with a value of `submitTodo`.
9.  Save the file.

### Action 3 -- Add a submit handler to App

1. Open **App.js** for editing.
2. Under the **state** declaration, add an *arrow function* called `submitTodo`, it should: 
   -   Receive `todo`; 
   -   Declare a `const` called `updatedTodos`, defined as an **array** that has a ***spread*** of `todos.todos` as its first element and `todo` as its second element;

```jsx
    const updatedTodos = [...todos.todos, todo];
```

- -   Call `setTodos` with `updatedTodos`.
3.  In the render of the function, add an **attribute** of `submitTodo` to the **AddEditTodo** component with a value of `submitTodo`.
4.  Save the file.

Run the application and check that adding a new **todo** updates the application.

---

TODO: Activity 14b rewrite - testing-library

## Activity 14b -- Thinking In React Part 5 -- Testing Form Submission

### Objectives

-   To be able to add inverse data flow to an application by passing
    handler functions by props

### Overview

In this QuickLab, you will test the submission of the form triggers the submit function that is passed in through props. The function will be mocked and spied on to ensure that it is called. Tests should also check that the state values are reset on submission. This will be achieved by creating an instance of the **TodoForm** component with an appropriate prop for **`submitTodo`** -- this will need to be added to all instances of the **TodoForm** component that are created in this test file to maintain the correct construction for each test. Asynchronous calls will be made to the **`onChange`** methods to update values and then the **`onSubmit`** event should be fired. The assertions from this test is that the **`submitTodo`** function has been called once with the values for description and completed as set in the asynchronous calls and null for the date created. Further assertions should be made to check that the values of description and completed are reset to an empty string and false, respectively.

You should continue working on the same project as you used for Activity
14a.

### Action 1 - Fix the failing tests

1. Run `npm test` you should find that there are failures due to a missing `prop`.
2. Fix the failures by retro-fitting the renders of the `AddEditTodo` and `TodoForm` components with a `submitTodo` property that passes in a mock function.
   - The first line in each top-level suite should be:

```jsx
    const mockSubmitTodo = jest.fn();
```

   - Each render method should now read:

```jsx
    render(<AddEditTodo submitTodo="mockSubmitTodo" />);
```
3. Do not proceed until all tests are passing.

### Action 2 - Check that the TodoForm calls mockSubmitTodo

1. Make sure that you are working in the file **TodoForm.test.js**
2. Add a nested suite called `Form submission tests` and its arrow function.
3. Write a `test` called `test the submitTodo prop function is called when submit button is clicked` with an arrow function that:
   -  Use similar code from the `enable submit button` test to enable the button
   -  Uses a `click` call with the button to simulate the user submitting the new todo
   -  *Asserts* that the `mockSubmitTodo` function has been called 1 times.
   -  *Asserts* that the `mockSubmitTodo` function has been called with `testDesc, null, false`
4. Save the file and check that the tests pass.

### Action 3 - Check that the AddEditTodo component calls mockSubmitTodo

#### Action 3.1 - Mock the DateCreatedComponent

Use the same mock you defined for the `TodoForm` tests in this file. (Essentially copy and paste it).

---

#### Action 3.2 - Mock the generateId function

Add a mock that will return `test_id` as a string when the `generateId()` is called:

```js
jest.mock(`../Components/utils/generateId`, () => () => `test_id`);

```

---

#### Action 3.3 - Test that `mockSubmitTodo` is called

1. Add a test to the existing suite with the title `it should call mockSubmitTodo when the form is submitted` and an arrow function that:
   - Sets a `const` `testDesc` to the string `Test description`;
   - Sets a `const` `descInput` to a `getByPlaceholderText` query on `screen`, looking for the regular expression `/todo description /i`
   - Sets a `const` `submitBtn` to a `getByDisplayValue` query on `screen`, looking for the regular expression `/submit/i`
   - Sets a `const` `testTodo` that is an object with key value pairs:
     - `_id: test_id`,
     - `todoDescription: testDesc`,
     - `todoDateCreated: undefined`,
     - `todoCompleted: false`
   - Simulates typing `testDesc` in the `descInput` by calling `type` on `userEvent`
   - Simulates clicking on `submitBtn` by calling `click` on `userEvent`
   - *Asserts* that `mockSubmitTodo` was called *exactly once*
   - *Asserts* that the `mockSubmitTodo` was called *with* `testTodo`

Remember to add `screen` to the imports from `@testing-library/react`
Remember to import `userEvent` from `@testing-library/user-event` (no `{ }` needed!)

Save the file and make sure that the tests pass before proceeding.

---

### Action 3.4 - Write a test for the App Component

Challenge: can you write a test that checks to see if the todo is actually added to the array when the submit button is clicked?

Answer in the solution file!

---

[&lt;-- Previous - 7. Thinking in React Part 4](7-ThinkingInReactPart4.md) | [Next - 9. Working with External Data --&gt;](./9-WorkingWithExternalDataPart1.md)
