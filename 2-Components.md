# Components and JSX

## Outcomes

- To understand what components are
- To know what JSX is and why it is used in React JS
- To be able to create Functional and Class Components
- To be able to add multiple components

---

## React Components

- React is fundamentally about Components

- Developers need to think in Components when working with ReactJS\!

- According to the official documentation:

> “React is a library for building composable user interfaces\. It encourages the creation of reusable UI components which present data that changes over time\.”


### Components

* Should be created as a Function
  * Traditionally applications were a mixture of Function and Class components
  * Since React v16\, all components can be Functions
  * Class Components will NEVER be deprecated
* Should be written using JSX
  * Can be written in raw JavaScript – readability suffers
  * JSX helps integrate HTML and JavaScript
  * Written specifically for ReactJS

### JSX – The Language for REACT

- Short for JavaScript Syntax Extension

- Provides syntactic sugar for component code

- Helps clean up HTML and JavaScript

- Makes it easier and quicker for developers

- Faster optimisation occurs when compiling to JavaScript

- Helps prevents XSS attacks

Essentially\, it converts the HTML in the return of a component into a React element which in turn creates the actual element to be added to the DOM

```html
<div className="header">
    <h1>My React App</h1>
<div>
```

Becomes:

```js
React.createElement("div", {className: "header"};
React.createElement("h1", null, "My React App"));
```

#### JSX Expressions

- After compilation they become regular JS function calls that evaluate to JS objects

- Can assign variables to it

- JS Expressions can be embedded into JSX using curly braces:

```jsx
import React from "react";  // < React v17

const Title = () => { 
  const title = `My React App`;
  const el = <h1>Welcome to {title}</h1>;
  return (
    <>{el}</>
  );
};
export default Title;
```

Would render: __Welcome to My React App__

**Note:** `<>...</>` is shorthand for `<React.Fragment>...</React.Fragment>`

## JSX is an expression too

- JSX expressions get compiled to regular JavaScript function calls the evaluate to JavaScript objects

This means that JSX can also be…

…returned from functions

…used as expressions inside __`if`__ statements and __`for`__ loops

…accepted as an *argument* in expressions and *function* calls

```jsx
function makeWelcomeMessage(user) {
  if (user) {
    return <h1>Hello, {getDisplayName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

---

## Components as Functions in JSX

Components should be **Functions**

Functions must return:

- a representation of a single native DOM component \(e\.g\. `<div />`) __OR__

- a custom composite component defined by the developer __OR__

- `null` or `false` to indicate that the component should not be rendered

This return should be __PURE__ \, it:

- Does not modify component’s state

- Returns same result each time it is invoked

- Does not directly interact with the browser

```jsx
// Component with single native DOM element

const  MyComponent  = props => {

    return (
        <h1>Hello World</h1>
    );
};

export default  MyComponent  ;
```

---

## Components can be classes

Components can be created as a class

The release of React version 16\.8 introduced functionality to the library that means they are no longer necessary in most cases

Classes will always be supported in React though\!

Class components must have a render method that must return:

- a representation of a single native DOM component \(e\.g\. `<div />`) __OR__

- a custom composite component defined by the developer __OR__

- `null` or `false` to indicate that the component should not be rendered

This return should be __PURE__

```jsx
// Component as a class with single native DOM element
class MyClassComponent extends Component {
    render() {
        return (
            <div>
                <h2>I am a class component</h2>
                <p>I work in almost the same way as Function components</p>
            </div>
        );
    }
};
export default MyClassComponent;
```

---

## ACTIVITY 3 – Create Function Components

In this ACTIVITY, you will:

- Add Function components to your application
- Render the new components as  a children of other components

### Outcomes

-   To be able to create Function components
-   To be able render components as children of others

### Overview

In this QuickLab, you will create Function components in their own files. You will then import these components into parent components, rendering as part of the parent's return.

### Actions -- Part 1 -- MyComponent


1.  In your Acivity 1 project, create a new file called **MyComponent.jsx** in the
    **starter/src** folder.

2. Create a `const` called `MyComponent` as an *arrow function* that takes
    *no arguments*.

3. Make the function return a single \<h1> with the text Hello World.

4. `export` `MyComponent` as a `default`.

5. Open **App.js** from the same folder and *delete EVERYTHING* in its
    return.

6. Put MyComponent as an *element* in the return, ensuring that it is
    *imported*.

7.  Save all files and run the application -- use npm start from the
    command line if required.

The app's display should now have been replaced with the content provided in **MyComponent**.

### Actions -- Part 2 -- AnotherComponent

1.  Create a new file called **AnotherComponent.jsx** in the
    **starter/src** folder.
2. Create a `const` called `AnotherComponent` as an *arrow function* that
    takes *no arguments*.

3. Make the function return a **React Fragment** `<> </>` with 2
    **paragraphs** that contain some text -- we used 10 '*lorem ipsum*'
    words.

4. `export` `AnotherComponent` as a `default`.

5. Open **MyComponent.jsx** and add `<AnotherComponent />` *under* the
    `<h1>` and wrap both in a React Fragment `<> </>` (ensuring
    **AnotherComponent** is *imported*).

6. Save all files and run the application (`npm start` from the
    command line).

You should see the text from **AnotherComponent** seamlessly displayed.

---

## ACTIVITY 4 - - Creating a Class Component

### Outcomes

-   To be able to create a Class component
-   To be able to nest components in others

### Overview

In this activity, you will create a new Class Component. You will then nest this new component in the existing App component.

### Activity

1.  Create a new file called **MyClassComponent.jsx** in the
    **starter/src** folder.

2.  Create a `class` called `MyClassComponent` that `extends` `Component`.

3.  Make the render function return a **React Fragment** `<> </>` with a `<h2>` and a `<p>` that contains some text.

4.  `export` the `MyClassComponent` as a `default`.

5.  Open **MyComponent.jsx** and add `<MyClassComponent />` under the
  `  <AnotherComponent />` (ensuring **`MyClassComponent`** is **imported**).

6.  Save all files and run the application (**`npm start`** from the
    command line if not running already)

    You should see the **`MyClassComponent`** seamlessly displayed with
    all of the others.

[&lt;\-\- Previous - 1. Introduction to ReactJS](./1-IntroductionToReactJS.md) | [Next - 3. Testing \-\-&gt;](./3-Testing.md)