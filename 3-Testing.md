# Introduction to Testing

# Outcomes

- To be able to install and use some Developer's tools for React
- To understand how tests are set up and run in a `create-react-app` React application
- To have an overview of the Jest testing library
- To be able to run and access code-coverage reports for tests

## React Developer Tools

### Debugging in the Browser

Because a development server is used, access is granted \(via source\-maps\) to the component code

They can be found on the Sources __tab__ \, accessing the _project folder_ on __localhost:3000__ and then the __src__ folder

Breakpoints\, watches and all the usual JS debugging features can be used here

![Accessing a Component's code in the Browser](img/BrowserComponentView.png)

### React Developer Tools

- Facebook provide an extension for Chrome and Firefox
  - Components view allows overview of rendered components
  - The component tree is displayed
  - Selecting individual component reveals more information
  - Additional tools will display the matching DOM element\, log the component to the console & show the component’s source code

![Chrome Developer Tools](img/ChromeDevtools.png)

### React in VSCode

These extensions forVSCode can help in making development more efficient and robust.

![VS Code Extensions](./img/VSCodeExtensions.png)

The *ES7 React* extension provides *Emmet* style shortcuts for many ReactJS constructs:

__`rafce`__  __\[Tab\]__ – gives boilerplate code for a Functional Component

There is a list of the shortcuts and the boilerplate they produce in the extension’s documentation

---

## Testing

* Integral part of software development
* __`create-react-app`__ projects come ready made to test:
   
  >“Jest is a delightful JavaScript Testing Framework with a focus on simplicity\.  It works with projects using: Babel\, TypeScript\, Node\, React\, Angular\, Vue and more\!”
  
  * The scripts supplied mean that __`npm`__  __`test`__ can be used to run the tests
  * Tests are run from files that contain __`.test.`__ in their name
  * These need not be in the same folder as the Component files – Jest is set up to look for test files
  * Tests are also run from any __\.__  __js__ file within a folder called __\_\_tests\_\___

### Jest Overview

* Open Source JavaScript framework capable of testing _any kind_ of JavaScript application
* Follows Behaviour\-Driven Development to ensure that each line of JS is properly unit tested
* Provides small syntax to test smallest unit of entire application instead of testing it as a whole
* Features:
  * Doesn't depend on any other JavaScript Framework
  * Doesn’t require any DOM
  * Clean and obvious syntax

### Jest Test Building Blocks

#### SUITES

- Basic building block of Jest Framework

- Collections of similar type test cases written for a specific file or function

- Can be nested

- Usually contain a __describe__ function and at least 1 call to an __it__ or __test__ function

The describe function is not necessarily required though

__`describe()`__

Call to this function requires a string\, used to identify the suite and a function that contains calls to the __it__ or __test__ functions

__`it()`__  __or__  __`test()`__

Calls to these functions require a string\, used to identify the test case it represents and a function that defines how the test will be evaluated – through calls to the __`expect`__ function

### Jest Test Building Blocks

* __`expect()`__
* Defines the _actual value_ obtained by running the test case
  * __`it()`__ and __`test()`__ calls can have more than 1 __`expect()`__ call
* Uses __matchers__ to define how to compare the expected result with the actual

__MATCHERS__

* Jest provides a host of in\-built matchers
* Each does a Boolean comparison of the actual and expected outputs

### Jest MATCHERS

Example Spec

```js
describe(`A suite is just a function`, () => {
    let a;
    let b;
    it(`and so is a spec`, () => {
      a = true;
	b = `Another string`;
	expect(a).toBe(true);
	expect(a).not.toBeFalsy();
	expect(b).toContain(`her`);
	expect(b).not.toMatch(/foobar$/);    
    });
});
```

For this test to report as __PASSED__ \, all __`expect`__ calls must return true\.

__NOTE__ : This is not an ideal way to test these situations\!

### Custom Matchers

* Sometimes the built\-in matchers will not fit with the test required
* Jest allows custom matchers to be written
  * As long as they follow the correct pattern
* Jest’s documentation explains how to create these:
* [https://jestjs\.io/docs/en/expect\#custom\-matchers\-api](https://jestjs.io/docs/en/expect#custom-matchers-api)

### Jest Spy

Allows spying on the test code’s function calls

Intercepts call to actual function and allows logging and monitoring of calls to it

For existing functions\, the __`spyOn()`__ method needs to receive the object and the name of the function

Jest provides a number of matchers to verify that the function has been used appropriately:

| **Matcher**                               | **Description**                                                                                |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `toHaveBeenCalled()`                      | Expect the function spied on to have been called at least once                                 |
| `toHaveBeenCalledTimes(exp)`              | Expect the function spied on to have been called an expected number of times                   |
| `toHaveBeenCalledWith(obj)`               | Expect the function spied on to have been called with these particular arguments at least once |
| `toHaveBeenLastCalledWith(arg1, arg2, …)` | Expect the last call of the function to have had the arguments supplied                        |
| `toHaveReturned`                          | Expect the function to have returned                                                           |
| `toHaveReturnedTimes(number)`             | Expect the function to have returned a specific number of times                                |
| `toHaveReturnedWith(value)`               | Expect the function to have returned with a specific value                                     |

---

### Jest `fn()` and `spyOn`

* __`jest.fn(implementation)`__ returns a new\, unused mock function with an optional implementation
* __`jest.spyOn(obj, methodName, accessType?)`__ is similar to __`jest.fn()`__ but also tracks calls to __`obj[methodName]`__.  
  * Returns a Jest mock function
  * By default it calls the spied method – this is different to other testing libraries

### Set Up and Tear Down

* Code can be executed before and after each spec or suite is run
* Jest provides the following functions to facilitate this
  * Each receives can receive a function to execute \(and a timeout for asynchronous use\):

| BEFORE                                                                                              |                                                                    | AFTER                                                                     |                                                              |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `beforeEach()`                                                                                      | `beforeAll()`\*                                                    | `afterEach()`                                                             | `afterAll()`\*                                               |
| Runs before each `it()` or `test()` call executes when present at the start of a `describe()` block | Runs once, before any of the `it()` or `test()` calls are executed | Runs straight after each of `it()` or `test()` call executes when present | Runs after all of the `it()` or `test()` calls have executed |
|                                                                                                     |


\* Seen as dangerous as can result in leaking state between specs producing erroneous passes/fails

---

### Code Coverage

To run tests with code-coverage activated use:

```sh
npm  test -- --coverage
```

* Unit tests ran from the CLI can create code coverage reports
  * Reports show parts of code base not properly tested by unit tests

![Code Coverage Display in the console](./img/CodeCoverageConsole.png)

* Results stored in **/coverage** folder
  * HTML versions can be access in the **lcov\-report** folder **–index\.html** gives access to the overview:

![Code Coverage Display in HTML](./img/CodeCoverageHTML.png)

---

## Testing React Applications

* Methods for testing ReactJS components can be divided into 2 categories
* By rendering a component tree in a test environment and asserting on their output
* Running end\-to\-end \(e2e\) tests in a realistic browser environment
  * e2e not really concerned with React components
* __ReactJS\.org__ recommend using __Jest__ \, __react\-test\-renderer__ and/or __react\-testing\-library__ for testing components

## ACTIVITY 5 - NO ACTIVITY 

---

[&lt;\-\- Previous - 2. Components and JSX](./2-Components.md) | [Next - 4. Thinking In React Parts 1 and 2 \-\-&gt;](./4-ThinkingInReact1and2.md)
