# Single Page Applications using React Routing - Part 2 - Parameterised Routes

## Outcomes

- To be able to define what happens on a particular route
- To be able to set and read parameters on a route

---

## Parameterised Routes

## Creating Parameterised Routes and Links

- Links to parameterised paths can be defined by hard coding or by supplying an expression\, perhaps based on some property of an object

```jsx
<Link to="/content/subContent1" />

<Link to={`/content/${subContent.id}`} />
```

- To define a route to a parameterised property\, colon notation is used followed by the name of the parameter to use

```jsx
<Route path="/content/:subContentId" component={SubContent} />
```

## Using Parameterised Routes \- React Router  <v5\.1

Prior to _React Router  v5\.1_ \, the following pattern would be used to access parameters in a route:

To use the __`params`__ in the matched URL\, __`props`__ need to be passed to the rendering component and the __`match`__ object accessed – in a render route its done by passing __`props`__ or __`{match}`__

```jsx
const SubContent = props => (
	<h1>props.match.params.subContentId</h1>
);

// OR

const SubContent = ({match}) => (
    <h1>match.params.subContentId</h1>
);
```

## Using Parameterised Routes \- React Router  v5\.1\+

_React Router  v5\.1_ introduced a number of HOOKS to use with routes

One such hook was the __`useParams`__ hook – imported from __react\-router\-dom__

To use *route parameters*\, simply _deconstruct_ the result of the __`useParams`__ function

***Remember: Deconstructed names must match those in the object being deconstructed***

```jsx
import { useParams } from "react-router-dom";

const SubContent = () => {
	const { subContentId } = useParams();
	return (
		<h1>{subContentId}</h1>
	);
};
```

---

## Activity 20 - Use Parameterised Routes

## Outcomes

-   To be able to use parameters to define and evaluate routes

-   To be able to use parameter data in view logic

## Overview

In this activity, you will modify the **Route** to be used by an edit link to pass in the Id of the todo that is to be edited, setting **:\_id** as a **Route** parameter in the **path**. The current link in the **Todo** component will be updated to use a **Link** component along with the Id to dynamically create a link for each todo.

The **AddEditTodo** component will be modified so that it recognises the todo that has been chosen for editing. This will be done by leveraging the **useParams** hook that is supplied as part of the react-router-dom package to idenitfy the id of the todo to update.

The id will help find the todo from the array of todo objects and then parse the values into the form. The update function will operate in the same way as before.

We will add a **Redirect** to show the list of todos when submit is clicked.

You should continue use the **RoutedApp/starter** folder or the **solution-activity19** folder.

### Action 1 -- Add a Route for editing a Todo and a 404 route

1.  Ensure that JSON server is running as in previous Activities.

2.  Open **App.js** for editing.

    -   In the `<Route>` for `/add`, change the `submitTodo` prop's name to `submitAction` and remove all other props.

    -   Under the `<Route>` for `/add` add another `<Route>` with a path set to `"/edit/:_id"`;

    -   Populate the `Route` component with an `<AddEditTodo />` and attributes:

        -   `submitAction` set to `{updateTodo}`;

        -   `data` set to `{todos}`.

3.  Add a `Route` component with ***no path data*** that renders the `NotFound` component included in the folder **Components/utils**.

4.  Remove or comment any code that references `todoToEdit` or `setTodoToUpdate` and `selectTodo` as this is not needed anymore. You will find code in:

    -   The declaration of **state** for `todoToEdit`;

    -   The `selectTodo` function;

    -   The `setTodoToEdit` call in the `updateTodo` function;

    -   The `selectTodo` prop passed into the `AllTodos` component.

5.   Save the file.

### Action 2 -- Link \'Edit\' in the table to the Route

1.  Open **Components/Todo.jsx** for editing.

2.  **Import** `Link` from \'react-router-dom\'.

3.  Add `_id` to the deconstruction of the `todo` prop.

4.  Change the `<span></span>` that surrounds **`'Edit'`** to a `<Link></Link>` that has attributes:

    -   `to` set to **{\`/edit/${todo._id}\`}**;

    -   `className` set to `link`;

    -   As you have removed the selectTodo callback from the link, if you have ***deconstructed*** the **props**, you can remove `selectTodo` from there and the **propTypes**.

5.  Save the file.

Return to the browser and check that clicking on one of the Edit links produces a URL that has `/edit/` followed by the `_id` contained in the JSON file for that todo. Note that there will not be anything displayed!

### Action 3 -- Make the AddEditTodo component recognise the Todo to edit

**Action 3.1:** Change the `useEffect` to use the *parameter* in the *route* and make the todo to edit be recognised in the component:**

1.  Open **Components/AddEditTodo.jsx** for editing.

2. Replace `props` with a *deconstructed object* of `submitAction` and `data` and replace all references to `props.submitTodo` with `submitAction`.

4. Add an **import** of `useParams` from **react-router-dom**.

5.  Add a **new state** called `todo` initially set to an empty object.

6. Declare a **const** `{ _id }` to be a call to the `useParams` hook.

7.   Add a **`useEffect`** that:

     -   Sets `todo` to an empty object ***if*** ***there is no*** `_id` from the
         **`useParams`** hook.

     -   Sets a `todoToEdit` by ***finding*** a `todo` in the `data` array (if it has a `find` property) whose `_id` **matches** the `_id` from the **`useParams`** hook;

        -   ***If one is*** ***found***, **set** `todo` with it;

        -   ***If not***, **set** `todo` to an **object** with a **key** of `error` and a **value** of a *string* of `Todo could not be found`;

     -   Has a ***dependency array*** that contains `_id` and `data`.

8. In the **render**, add a **conditionally rendered** `<Modal>`, displayed if `todo` is set and has an `error` property. The `handleClose` property should set `todo` to `null` and the `message` property should be `todo.error`.

9.   In the `<h3>` make a *conditional statement* to display `Edit` if `_id` has a value and `Add` if not.

**Action 3.2:** Make the `submitTodo` function handle both **adding** and **updating**

1.  Add a ***new state*** to the `AddEditTodo` component called `submitted`, initially `false`.

2.  Comment out the `updateTodo` and `submitAction` functions.

3.  Add an additional argument of `todoId` to the `submitTodo` function.

4.  Remove the setting of `_id` in `submitTodo`.

5.  Declare a `const` called `id` and set this to either the `todoId` or a
    call to `generateTodoId` dependent on whether `todoId` was present.

```js
    const id = todoId ?? generateTodoId(); // ?? means use the second value if the first is Falsy;
```

6.  Change the name of `newTodo` to `todoToSubmit` and change:

    -   The `todoDateCreated?.toISOString()` call to create a `new Date`
        from `todoDateCreated` and ***then convert it to an ISO String***;

    -   The final argument to `id`.

7.  Change the passed value in `submitAction` to `todoToSubmit`

8. Set `submitted` to `true`;


**Action 3.3:** Make the submitting the form return to the homepage when submitted or no todo to edit exists:

1.  Still in `AddEditTodo`, add an **import** of `{ Redirect }` from **react-router-dom**.

2. In the Component's *return* insert a *conditionally rendered* `<Redirect />` with a `to` attribute set to `'/'` that is dependent on `submitted`.

3. Change the `TodoForm`'s prop of `submitAction` to `submitTodo` and `todo` to `todo`.

4. Change the `propTypes` to reflect that:
   - `submitTodo` and `updateTodo` are no longer props;
   - `todo` is now `todos` and is a `PropTypes.arrayOf` the `PropTypes` of the `todo`;
   - submitAction is a function and required.

5. Save the file.

**Action 3.4:** Make the form submit `_id` as part of the data if present:

1. Open TodoForm.jsx for editing.
2. in the call to `submitAction` in the `handleSubmit` function, add a final argument of the `_id` of the todo in state, if it exists:

```js
submitAction(todoDescription, todoDateCreated, todoCompleted, todo?._id);
```

3. Save the file and run the application.

> Check the navigation in the browser, you should see that the \'Edit\' link now populates the form with the selected Todo and when submitted, the updated Todo is shown in the AllTodos table.

>You should also find that clicking Submit after using the \'Add Todo\' main navigation link returns to the list of Todos showing the newly added Todo in it.

