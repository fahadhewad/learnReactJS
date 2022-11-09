# Introduction to ReactJS

## Outcomes

- To become aware of what React is
- To be aware of developer tools available for React
- To be able to set up the developer environment and a skeleton React application
- To be aware of the security concerns with React

---

## ReactJS -- Another JS Framework - right?

WRONG\!

ReactJS is not a framework it’s a UI Library

- Developed at Facebook
- Purpose is to facilitate the creation of interactive\, stateful and reusable UI components
- Facebook have used React for Instagram and in Facebook itself\!
- Instagram’s UI is completely made with React
- Facebook’s commenting UI is React\-based
- Parts of Netflix use React
- Often used as the “V” part of MVC – no assumptions made about rest of stack
- React is there to take data and display it\!

![Companies using React](./img/CompaniesUsingReact.png)

---

## What does React do?

- Performs work on client side
- Can be rendered on server side
- Both client and server side can work together
- Uses a concept called **Virtual DOM**
- It performs the least amount of DOM manipulation possible for a fast\, fluid interface yet still up to date

## A Really Simple ReactJS Application EXAMPLE

The smallest possible ReactJS example would be:

```jsx
import React from "react";  // < React 17.0
import ReactDOM from "react-dom";

ReactDOM.render(
    <h1>Hello World</h1>,
    document.querySelector(`#root`)
);
```

Essentially, this places the ReactJS component (the first argument to `ReactDOM.render`) in the element with an `id` of `root` in **index.html**.

---

## Virtual DOMs

- A copy of the actual DOM that React uses to decide what needs to updated
- If a component is changed as a result of code being executed, the page has to update
- Rather than update the whole page, React does two things:
- First, it runs a diffing algorithm, which finds out what properties have changed in that object in the Virtual DOM
- Second, reconciliation happens, where it updates the parts of the DOM identified by the diffing algorithm
- This is really good for multiple reasons.
- Memory: since it’s only changing what it needs to change, there’s less overhead overall.
- Fluidity: the entire object (or page!) doesn’t need to refresh whenever anything changes, only what needs to change.
- Server-side DOMs can be rendered to enable server-side React views
- Even less overheads!

---

## The Developer Environment

As with all modern web development it requires heavily on `NodeJS` and `npm`

Application tooling can be:

***Zero-config*** – use the `create-react-app` `npx` package runner to produce a skeleton ReactJS application and install all of the required tooling (including testing)

***_*Manual*_*** – use **Webpack** and **Babel** to transpile and bundle *JavaScript* and ***JSX*** modules

---

## How a ReactJS app gets into the browser

- Browser executes the JavaScript, rendering the initial component in the specified element

- Other components rendered as children or through other mechanisms such as navigation

- User makes a request to a URL that contains a ReactJS application

- HTML page returned that runs a JavaScript file containing the ReactJS code, usually **main\.XXXXXXX\.chunk\.js**

---

## ACTIVITY 1 - Get a ReactJS application up and running

## Objectives

-   To be able to use the create-react-app node package extractor to quickly scaffold a ReactJS application
-   To be able to launch the application in the browser using the command line

## Overview

In this activity, you will set up a ReactJS application using a special node package extractor called create-react-app. Once the installation of files has completed, you will launch the application in the browser and see it running.

## Actions

1.  Using **CTRL + \'** on the keyboard
    (**CTRL + \`** on MacOS) or by using click-path **View -- Terminal**
    (or **Terminal -- New Terminal** on **MacOS**), open **VSCode\'s**
    integrated terminal or click the terminal icon on the bottom bar.

2.  Using the cd command, navigate to the **ActivityFiles/IntroductionToReactJS/**
    folder.

3.  Create a *new* ReactJS application using the command:

```sh
npx create-react-app starter
```

Wait for the installation to complete.

3. Use the `cd` command to change into the **starter** folder and then
    run the application by using the command:

```sh
cd starter && npm start
```

Your browser should open at [*http://localhost:3000*](http://localhost:3000) with the following
screen (or similar):

![Default React App](./img/ReactApp.gif)

## ACTIVITY 2 - Build and Serve an Application

## Objectives

-   To be able to build production-ready code using the scripts provided in the application
-   To understand what the build process creates and where the files are put

## Overview

In this activity, you will produce a production-ready set of code for the skeleton application. This will make bundles of the HTML, CSS and JavaScript needed to efficiently deploy the application. You will explore the files that are created and view the application in the browser.

## Actions

1.  In VSCode, if the server is running on the command line, press
    **CTRL+C** to stop it.

2.  Make sure that the command line is pointing to
    **ActivityFiles/IntroductionToReactJS/starter**.

3.  Make a production ready version of the application by typing:

```sh
npm run build
```

4. Once the process has finished, install a server to view the
    application:

```sh 
npm i -g serve
```

5. Once the installation is complete, run the app in the server:

```sh
serve -s build
```

6. Open the browser to [*http://localhost:5000*](http://localhost:5000/) and view the application.

7. Browse the files created in a new folder called **build** in the application root:

    -   Find **index.html** and its reference to the JS files;
    -   Find the JavaScript files -- view these in **VSCode**.

Building the application optimises the files for the fastest download without affecting functionality.

This is the end of this activity.

[&lt;\-\- Previous - Introduction to ReactJS](./README.md) | [Next - 2. Components & JSX \-\-&gt;](./2-Components.md)
