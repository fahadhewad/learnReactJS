# Thinking In React – Part 4 - Identifying Where State Should Live

## Outcomes

- To be able to identify where State should live in an application
- To be able to use the `useState` hook to add state to a component
- To be able to add state to track the changes on forms

## Thinking in React Process

0. Start with a mock
1. Break the UI into a component hierarchy
2. Build a static version in React
3. Identify the minimal \(but complete\) representation of UI state
4. **Identify where your state should live**
5. Add inverse data flow

---

## 4\. Identify where state should live

- Involves identifying which component mutates or owns the state
  - React all about one\-way data flow down component hierarchy
  - May not be immediately clear which component should own state
- To work out where state should live:
  - Identify every component that renders something based on state
  - Find common owner component
  - Either common component\, or component even higher up\, should own state
  - If no component makes sense\, create new component to hold state and add it into the hierarchy above the common owner component

- For the example:
  - __ProductTable__ needs to filter product list based on state and __SearchBar__ needs to display search text and checked state
  - Common owner component is __FilterableProductTable__
  - Conceptually makes sense for filter text and checked value to live in __FilterableProductTable__

---

## Peer Group Activity 12 - Thinking in React Part 4 -- Identifying where State should live in the Todo App

## Objectives

- To be able to place the identified state in an application in an appropriate component.

### Action 1 -- List of todos

Identify where the list of todos should live as state in the application.

To work out where state should live:

- Identify every component that renders something based on the list of todos;
- Find common owner component of all of the components;
    - Either common component or component even higher up should own state;
    - If no component makes sense, create new component to hold state and
    add it into the hierarchy above the common owner component.

## Action 2 -- All properties of a 'new' or 'updated' Todo

Identify where the all of the properties of a 'new' or 'updated' Todo should live as state in the application.

To work out where state should live:

- Identify every component that renders something based on the individual properties of a 'new' or 'updated' Todo;
- Find common owner component of all of the components;
    - Either common component or component even higher up should own state;
    - If no component makes sense, create new component to hold state and add it into the hierarchy above the common owner component.

---

#### Example Solution

<details>

**List of todos**

The **list of todos** needs to be accessed by the **AllTodos** component but it also needs to be updated as a result of the **AddEditTodo** component. This strongly suggest that the **list of todos** should live in a common parent component and in the hierarchy of this application, that is seemingly the **App** component. The **todos** can then be passed to the **AllTodos** as props and when the list is updated, the application will update as a result of this state changing. The functionality for updating the list is not considered yet. 

**New Todo**

As data for the new or updated todo comes from the **TodoForm**, there needs to be state within the **TodoForm** for the **Todo Description** and **Todo Date Created** and **Todo Completed**. *We are not dealing with the submission of the todo at this point, so functionality to pass the data back to the parent component is not considered*. Each todo property's state will be updated by the use of an **onChange** event trigger for the **Description** or **Completed** state and an **updateDateCreated** trigger on the **DateCreated** component.

You will notice that the **DateCreated** component also holds internal state for its functionality.

</details>

---

## Adding State to a Component

**State in Function Components?**

- Previous _to React v16\.8_  __state__ was _not allowed_ in __Function__ components
- __Hooks__ were introduced that allows __Function__ components to have __state__
- __\{__  __useState__  __\}__ needs to be imported from React to allow this functionality
- Declaring __state__ needs the _destructured_ setting of an _array_ containing the _state name_ and a _function to update it_ assigned to a call to __useState__ with an _initial value_
  - On the initial render\, the initial value passed will be used

```jsx

// Abstract
const [myState, setMyState] = useState(optionalInitialValue);

// Component Example
import { useState } from "react"; 

const App = () => { 
    const [count, setCount ] = useState (0); // count initially set to 0

    return ( 
        <p>Count is: {count}</p> 
    ); 
}; 

export default App;

// Would display: "Count is: 0" on the page if rendered


```

---

### Updating of State in Function Components

- __State__ often updated due to occurrence of an event
  - E\.g\. a click or a change
- The _setState_ function can be called with the new value of __state__
  - Can be called as part of an _arrow function_ used for the _event handler_
  - Alternatively can be called as part of a larger handling function if required
- Calling of _setState_ function __triggers re\-render__ of _any Component_ dependent on the __state__
  - Including those that use it as a __prop__

```jsx
import { useState } from "react"; 

const App = () => {

    const [count, setCount ] = useState (0); // count initially set to 0

    return( 
        <> 
            <p>Count is: {count}</p>

            <button onClick ={() => setCount (count + 1)}>Add</button> 
            {/*Adds 1 to count every button click and triggers re-render of component */}
        </> 
    ); 
}; 
export default App;

// Would display: 
// ‘Count is: 0’ initially 
// ‘Count is: 3’ after 3 clicks and so on...
```

---

### State in Class Components

- Before _React v16\.8_ \, if state was required a __Class component had__ to be used
- __State__ is initialised in the __constructor__
- __setState__ is called to update state
  - Only properties and values to update need to be included
  - Calling of __setState__ triggers a re\-render of any component dependent on __state__
    - Including those that use the state as a __prop__

```jsx
import React, { Component } from "react";

class App extends Component { 
    constructor(props) { 
        super(props);                  // Tells a class component it has props
        this.state = {
            count : 0
        }; 
    }

    render() { 
        return (
            <> 
                <p>Count is: { this.state.count }</p> 
                <button onClick ={() => this.setState ( { count: this.state.count + 1 } ) }>
                    Add
                </button> 
            </> 
        ); 
    } 
} 

export default App;

// Would display: 
// ‘Count is: 0’ initially 
// ‘Count is: 3’ after 3 clicks and so on...
```

---

## Forms and React

- Forms inherently keep some internal state and therefore React has to work differently with them
  - A standard form with a submit button would work in React out of the box \(as shown below\)
  - Usually want to have access to the form values that have been submitted
  - Controlled components are the recommended way to achieve this
- Events trigger the updating of state in React components to keep everything in sync

```html
<form>
    <label>Name:
        <input type="text" name="name" />
    </label>
    <input type="submit" value="Submit" />
</form>
```

### Since we’ve mentioned Events…

- Method to handle events with React Elements is very similar to handling events on DOM elements
- Syntactic differences:
  - React events are _camelCased_ rather than lowercase
  - With JSX you pass a function as the event handler rather than a string
  - Cannot return false to prevent default behaviour–must use __preventDefault__  __\(\)__
  - Don’t need to call __addEventListener__  __\(\)__ in React\, just provide listener when the element is initially rendered
  - Common pattern for ES2015 classes is for the event handler to be a method of the class or an arrow function set in the constructor – can also be arrow functions in a Function component
  - _If using a method in a class it is necessary to_  _bind_  _the method\, either in the constructor or in the_  _callback_
    - Function components do not need worry about binding

```jsx
import { useState } from "react"; 

const App = () => { 
    
    const [count, setCount ] = useState(0); 
    const [ currClass , setCurrClass ] = useState(`green`); 
    
    const changeClass = e => { 
        if( e.type === `mouseenter`) setCurrClass (`red`); 
        if( e.type === `mouseleave`) setCurrClass (`blue`); 
    }; 
    
    return ( 
        <> 
            <p>Count is: {count}</p>
            <button onClick ={() => setCount (count + 1)}>+</button>
            {/* onClick event triggers callback and a re-render */}
            <p 
                onMouseEnter={e => changeClass (e)} 
                onMouseLeave={e => changeClass (e)} 
                className ={ currClass }
            > 
                Move the mouse over this text to change colour 
            </p> 
            {/* onMouseEnter and onMouseLeave calls the changeClass function, passing the event as an argument and // setting the value of currClass causing a re-render */} 
        </> 
    );
 }; 
 
 export default App;
 ```

### Examples of Events in a Function Component

#### Collecting Form Data

Form elements usually maintain their own state and it is changed through user input

React component’s mutable state is kept in the state property and can only be changed by calling its _`setState`_ method

The form shown below would work but it could be seen as an __‘uncontrolled’__ component

React does not explicitly control the value displayed in the input box

```jsx
// An form with an uncontrolled component 
import { useState } from "react";

const Form = () => {
    const [name, setName] = useState(``);
    
    return(
        <form>
            <input 
                type="text"
                name="name"
                onChange={event => setName(event.target.value)} 
            />
    </form>
  );
};
export default Form;
// Typing in the Name input box updates the name state but does not reflect this back to the input's value
```

To make it a controlled component\, set the __`value`__ attribute to the _associated value in state_

```jsx
    <input type="text" name="name" value={name} onChange={event => setName(event.target.value)} />
```

```jsx
import { useState } from "react";

const Form = () => {
    const [name, setName] = useState(``);
    return(
        <form>
            <input 
                type="text"
                name="name"
                value={name}
                onChange={event => setName(event.target.value)} 
            />
    </form>
  );
};
export default Form;
// The output of the input is now controlled by React as the state change will be updated in the value of the input
```

---

### Testing User Inputs

One of the issues testing a React application stems from the need to interact with the components like a user does so that we can fully test them.  We don't really want to test if state works, rather if the input has the desired effect on the output render.

`@testing-library/user-event` provides a `userEvent` object that provides *user interactions* like:

- `type(targetElement, testText)` which takes a text input element and some text to type as arguments
  - has the effect of typing into an input box
- `click(targetElement)` which will simulate a click event on the element passed in
  - e.g. Clicking a button; changing the status of a checkbox; selecting a radio button value

These are used in conjunction with `render` and `screen` and queries to select particular elements.

> `@testing-library/user-event` is a separate **npm** package to `@testing-library/react` - it is included in the set up of a project scaffolded with `create-react-app` and can be used immediately without any additional installations

```jsx
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe(`Form User Interaction tests`, () => {

    let testContainer;
    
    beforeEach(() => {
        const { container } = render(<Form />);
        testContainer = container;
    });

    test(`Typing in input on form updates value`, () => {
        // Arrange
        const testText = `Test text`;
        const input = testContainer.querySelector(`input`);
        // Check initial condition
        expect(input).toHaveValue(``); // Check input is initially an empty string
        // Act
        userEvent.type(input, testText);  // Simulate typing into input  
        // Assert
        expect(input).toHaveValue(testText);
    });

    test(`Clicking on checkbox on form toggles it's state`, () => {
       // Arrange
       const checkBox = screen.getByRole(/checkbox/);
       // Check initial condition
       expect(checkBox).not.toBeChecked(); // Check checkbox is initially not selected
       // Act
       userEvent.click(checkBox);  // Simulate clicking checkbox to select
       // Assert
       expect(checkBox).toBeChecked();
       
    });
});
```

---

## Activity 13a -- Thinking In React Part 4 - Adding State

### Outcomes

-   To be able to add state to components and pass it as props to child components.
-   To be able to update state using events and test that the state change updates the render.

### Overview

In this activity, you will add **state** to the **App** and **TodoForm** components and modify the application to pass the state down as props where it is needed. The import of **sampleTodos** will need to be moved to the **App** component and then set as the *initial state* for **todos**. This state will then need passing to the **AllTodos** component, removing some of the technical debt introduced through using static data straight into this component. The *values* on the **TodoForm** will also be tracked by adding **state** to this component and using the **onChange** event to update state.

Once this has been completed, the application will be tested again to ensure that all tests pass, fixing the tests where necessary to reflect changes made.

**Note:** The submission of the **TodoForm** is not covered in this activity. It is covered in Part 5 of Thinking in React.

Remember to refer back to the Acceptance Criteria for this part of the application too.

You may either continue in the **StaticVersion/starter** folder ***OR*** if you did not complete all parts of that, you can pick up with the **StatefulVersion/starter** folder. Remember, if you choose the latter, you will need to run **npm install** and start the application. 
### Action 1 -- Add state to the App Component

1.  Open **App.js** for editing from your project folder.
2.  Add `{ useState }`  imports from `react`.
3.  Add an import of `sampleTodos` from **./sampleTodos.json**.
4.  In the App function, *before the return*, add the line introducing a **state** called `todos` with an initial value of `sampleTodos`.
5.  In the **return**, add a **prop** to the **AllTodos** component called `data` set to {{todos}}.
6.  Save the file.

### Action 2 -- Make AllTodos use the todos from props

1.  Open **Components/AllTodos.jsx** for editing.
2.  *Remove* the import for sampleTodos.
3.  Allow **AllTodos** to receive a **prop** of `data` by adding this to the *arrow function* arguments.
4.  Modify the map function to use `data.todos` rather than `sampleTodos`.
5.  Ensure that the data prop is check through PropTypes. It needs to:
    -   Have a **key** of `data` that is an **exact** *object shape* of:
        -   A **key** of `todos` that is an **array** **of** an **exact**
            *object shape* that has the *4 properties of a todo* listed
            with the *correct types* associated to each key.

> Don't forget to import the `PropTypes` symbol.

6.  Save the file.

7.  Run the tests for this project.

> You should find that the test for **AllTodos** now fails. This is because **AllTodos** now expects to receive a **prop** of **data** and the create function doesn't provide this.

8.  Open **tests/AllTodos.test.js** for editing.
9.  In the create function that renders the **AllTodo** component, add a property of `data` set to an object with a **key** of todos and a **value** of `sampleTodos`.
10. Save the file and run the tests again.

> You should find that the test passes as a result of the change.

### Action 3 -- Add state to the TodoForm Component

1.  Open **TodoForm.js** for editing from your project Components folder.
2.  Add `{ useState }` imports from `react`.
3.  In the function, add state for:
    -   `todoDescription`, initially setting it as an *empty string*;
    -   `todoDateCreated`, initially setting it to `null`;
    -   `todoCompleted`, initially setting it to `false`.

4.  In the **form**, find the **input** for `todoDescription` and add properties:
    -   `value` set to `todoDescription`;
    -   `onChange` set to an arrow function that receives `event` and calls `setTodoDescription` with `event.target.value`.
5.  Find the `DateCreated` component and add the property `updateDateCreated` and set to an arrow function that receives
        `dateCreated` and calls `setTodoDateCreated` with it.
6.  Find the **input** for `todoCompleted` and add properties:
    -   `checked` set to `todoCompleted`;
    -   `onChange` set to an arrow function that receives `event` and calls `setTodoCompleted` with `event.target.checked`.

7.  Find the **input** for `submit` and:
    -   Add a `disabled` property that is set to `!todoDescription`;
    -   Set the input's `className` to `btn` and conditionally append either `btn-primary` when `enabled` or `btn-danger` when `disabled` -- you should use a *ternary* and the `todoDescription` property.
8.  Save the files and run the application.

You should find that the application still works. Additionally, the Component React Developer tools should show:

-   The value of state in the App component as an Array of Objects, which when inspected are the 4 todos from the **sampleTodos.json** file
-   The values of props in the **AllTodos** component -- namely **todos** that is set to the same array as the state in the App component!
    -   The props values of the 4 rendered **Todo** components are still
        there also.
-   The values of state in the **TodoForm** component, these should update as you enter data in the input, the passage of time and changing the value of the checkbox.

> Run the test specs again and check that all still pass.

---
## Activity 13b -- Thinking In React Part 4 -- Testing Event Handlers

### Outcomes

-  To be able to test that event handlers update the component using `userEvent`

### Overview

In this activity, you will test that the **onChange** handlers for the inputs update the **state** in the **TodoForm** component. You will need to add to the **TodoForm** test suite with a suite of **onChange** event tests. There needs to be a test that checks that the value of the description input changes to the specified value when its **onChange** is called and a test that checks the value of the **checkbox** for **todoCompleted** changes when **toggled**.  We also should check to see if the submit button is enabled and disabled correctly.

It is worth noting that the **todoDateCreated** update is not tested here. That is because the change is tested within the **DateCreated** tests. The updating of state in this component is trusted to the ReactJS library testing.

Continue working in the **StatefulVersion/starter** folder.

### Action 1 -- Test the onChange event on the todoDescription input

1. Open **tests/TodoForm.test.js** for editing
2. Move the `beforeEach` that `render`s a `TodoForm` component out of the first nested suite
3. Nest another suite under the previous one with the title `Form manipulation tests`
4. Add a test with a title of `it should render the new value in the input when todoDescription is updated` and an arrow function that:
    - Sets a `const` `testDesc` to the string `Test description`;
    - Sets a `const` `descInput` to a `getByPlaceholderText` query on `screen`, looking for the regular expression `/todo description /i`
    - Checks that the current value of `descInput` is an empty string
    - Acts on `descInput` by using it in a `userEvent.type` call along with `testDesc`
    - Asserts that `descInput` now has a value of `testDesc`

### Action 2 -- Test the onChange event on the todoCompleted checkbox

1. Add another test with the title `it should render the new value in the checkbox when the todoCompleted onChange function is activated` and an arrow function that:
   - Sets a `const` `completedCkbx` to a `getByRole` query on `screen` looking for the regular expression `/checkbox/`
   - Checks that the `completedCkbx` is NOT currently checked (use the `toBeChecked()` matcher with negation (`.not.`))
   - Acts on `completedCkbx` by using it in a `userEvent.click` call
   - Assert that `completedCkbx` is checked

### Action 3 -- Test that the Submit button is enabled/disabled appropriately

1. Add a further test with the title `should enable the submit button when the todo description is populated` and an arrow function that:
   - Sets a `const` `testDesc` to the string `Test description`;
   - Sets a `const` `descInput` to a `getByPlaceholderText` query on `screen`, looking for the regular expression `/todo description /i`
   - Sets a `const` `submitBtn` to a `getByDisplayValue` query on `screen`, looking for the regular expression `/submit/i`
   - Check that `submitBtn` is currently disabled (use `toBeDisabled()`)
   - Simulate typing into the `descInput` box with `testDesc`
   - Assert that `submitBtn` is no longer disabled

2. Save the file and run the tests - do all pass?

---

[&lt;-- Previous - 6. Thinking In React Part 3](./6-ThinkingInReactPart3.md) | [Next - 8. Thinking In React Part 5 --&gt;](./8-ThinkingInReactPart5.md)



