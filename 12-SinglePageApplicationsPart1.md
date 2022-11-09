# Single Page Applications using React Routing - Part 1 - Basic Routing

## Outcomes

- To understand how routing can be added to an application
- To understand the roles of the Router\, Route\, Switch and Link components

---

## Single Page Applications

* So far only looked at discrete components and pages
* Many modern applications are based on a single page
  * Content within the page changes depending on user input
  * Increases speed of web applications
    * Only content to be changed is affected instead of whole page reloads
* React\-Router is standard routing library to allow this behaviour
  * From the ‘docs’:
  > _React Router is a powerful routing library built on top of React that helps you add new screens and flows to your application incredibly quickly\, all while keeping the URL in sync with what's being displayed on the page\._

## Dynamic Routing v Static Routing

* Most frameworks and libraries use static routing
  * Routes declared as part of initialisation of app before rendering
  * Client side routers need routes to be declared upfront \(such as in Angular\)
* From React Router v4\, _DYNAMIC ROUTING_ is used
  * Routing takes place as app is rendering
    * Whole application is wrapped in a Router
    * Links defined within components
    * Route used to define which component should be rendered for the path
      * Route is just a component\!
  * Routing thought of as UI not static configuration

## React Router - Routers

* __react\-router\-__  __dom__ package has __`<Router>`__ with 5 variations on the common low\-level interface
* Typically high\-level router used in app
  * __`<BrowserRouter>`__
    * Uses HTML5 history API to keep UI in sync with URL
  * __`<HashRouter>`__
    * Uses hash portion of URL to keep UI in sync
  * __`<MemoryRouter>`__
    * Keeps history of URL in memory \(useful in testing and React Native\)
  * __`<StaticRouter>`__
    * Never changes location–useful in server\-side rendering
* __`<Router>`__ can be used to synchronise custom history with state management libraries

## Route

**Note - this all changes when upgrading to the recently released React Router version 6**
**The information below relates to the more widely used version 5 of React Router**

[See the ReactRouter documentation for more information](https://reactrouter.com/)

* Most important to understand and learn to use

```jsx
<Route path render_method [options] />
```

* Basic responsibility is to render a UI when a location matches route’s path
  * __`path`__ – specifies the URL
* 4 ways to render from a __`<Route>`__ :
  * __`<Route path="/"><ComponentToRender/></Route>`__ - wrap the component to render in the __Route__ (best practice!)
  * __`component`__ – specified component will be created and rendered
  * __`render`__ – allows for inline rendering and wrapping
  * __`children`__ – used to render whether the path matches the location or not–useful for animations
* Other parameters:
  * __`exact`__ – match only if path matches __`location.pathname`__ exactly
  * __`strict`__ – Boolean to represent if match should be made if trailing slash is present
  * __`object`__ – match path to passed location object’s history \(`current` by default\)


### Render a Route by wrapping a Component

* Simplest way to show a Component on a route
* Can render the component as normal, including passing ***props***, etc
* __`<Switch>`__ is used to ensure that only the first `Route` that matches the `path` is rendered
  * If not used\, interesting and unexpected rendering can occur
  * It is part of the __react\-router\-dom__ package
  * METHOD BELOW GENERALLY PREFERRED \( __props__ can also be passed\)

```jsx
<Switch>
    <Route path="/"><ComponentToRender props={} />\</Route>
    <Route path="/another"><AnotherComponentToRender /> </Route>
</Switch>
```

### Render a Route with component

* Good for components that don’t need any props passed to them

```jsx
<Switch>	
	<Route path="/" exact component={App} />
	<Route path="/subContent1" component={SubComponent1} />
	<Route path="/subContent2" component={SubComponent2} />
</Switch>
```

### Render a Route with render

- Can be used if props need to be passed to a component to be rendered on a Route
- Takes a callback that returns the desired component
- Can be mixed with other Routes that have components
- No performance difference to rendering with component
- Generally a discontinued practice for new applications

```jsx
<Switch>	
	<Route path="/" render={ props => <App {...props} newProp={newProp} /> } />
	<Route path="/subContent1" component={SubComponent1} />
</Switch>
```

### Render a Route with children

* Used to render whether the path matches the location or not
* Works like render except it gets called whether there is a match or not
* Receives all same route props as component and render methods
  * When route fails to match URL\, match is `null`
  * Allow dynamic adjustment of UI based on whether the route matches

```jsx
<>	
    <Route path="/" children={({match, props}) => 
        <div className={match ? "active" : ""}>
            <SomeComponent {...props} /> 
        </div>
    }/>
</>
```

---

### Defining and Linking to Routes

* Provide __`<Link>`__ components to create hyperlinks in the appropriate components

```jsx
<Link to="/">Home</Link>
```

* The __`to`__ attribute can be either a __string__ or an __object__
    * The object has 4 properties: __`pathname`__ \, __`search`__ \, __`hash`__ and __s`tate`__
    * Other attributes include __`replace`__ \, __`innerRef`__ and __`others`__
  
* Provide __`<NavLink>`__ when style attributes need to be added to the link when it matches the current URL object
  * It includes all attributes from __`Link`__ plus extras like __`activeClassName`__ \, __`activeStyle`__ \, __`isActive`__ and and some others

```jsx
<NavLink to="/" activeClassName="selected">Home</Link>
```

### Redirecting Routes

* Sometimes it is desirable to redirect the application depending on circumstance
* __`<Redirect>`__ is supplied as a routing component
  * Needs a __`to`__ attribute to define the **path** that should be redirected to
  * Put in place of any markup

```jsx
…
    <>
        {submitted ? (
            <Redirect to="/" />
        ) : (
            <p>Some other markup</p>
        )}
    </>
…
// Would render the Redirect if submitted is true
```

---

## Activity 19 - Prepare the Main Application for Routing

## Outcomes

-   To be able to use simple routes in an application

-   To be able to add internal links to an application

## Overview

In this activity, you will add routes to App.js for the default view, which will be the list of **AllTodos** and an **AddTodo** view, which will display the **AddEditTodo** component. To do this, an extra package called **react-router-dom** will need to be added to the project. A **BrowserRouter** component will wrap the whole application to enable routing. **Routes** will be defined in a **Switch** component to ensure that matches are made.

Once the application routing has been defined. The Header component will be modified to use a **Link** component rather than the usual `<a href>` combination to use React's routing system.

You should use the **RoutedApp/starter** folder as the 'Edit Todo' functionality has been included.

**Acton 1 -- Setting up for routing**

1.  Ensure that JSON server is running a serving the **todoData.json**
    file.

```sh
json-server todoData.json -p 4000 --id _id
```

1.  Point a command line at the root of your project and install **react-router-dom version 5** using the following command:

```sh
npm i --save react-router-dom@5.2.0
```

3. Open **App.js** for editing.

4.  **Import** `BrowserRouter as Router` `Switch` and `Route` from **react-router-dom**.

5. In the return of **App**, wrap all of the markup in a `<Router>` component:



**Action 2 - Define the application\'s Route components**

1.  Surround the call for the **AllTodos** and **AddTodo** components with a `<Switch>`.

2.  Surround the call for `<AllTodos...>` with a `<Route>` that has an `exact` `path` set to `"/"`;

3. Surround the call for `<AddEditTodo...>` with a `<Route>` that has a `path` of `"/add"`;

4. Save the file and check that the navigation works as expected when the path is typed into the address bar.

Notice how the application re-renders completely when an address is typed and that the **Edit** button on **AllTodos** does not appear to have any affect now .

**Action 3 -- Add navigation to the Header**

1.  Open **Header.jsx** for editing from the Components folder.

2.   **Import** `Link` and `NavLink` from **react-router-dom** (inside `{}`)

3.   Locate the link surrounding the text ***Todo App*** and:

     -   Replace the `<a></a>` with `<Link></Link>`;

     -   Replace `href=` with `to=`.

4.   Add links for **Todos** and **Add Todo** that sit inside a **div** with **classes** of collapse navbar-collapse and a **ul** that has **classes** of navbar-nav mr-auto. Each list item should:
   
     -   Have a `className` of `navbar-item`;

     -   Have a **`NavLink`** that has a `to` attribute of `"/"` or `"/add"`, a
         `className` of `nav-link` and an `activeClassNames` of `nav-link active`

5.   Save the file.

Check that the application now renders without completely refreshing the application - check the network activity in the Developer Tools to make sure!

Start the `json-server` again.

Try clicking on **Edit** in the table and then on the **Add Todo** link. You will notice that the todo is displayed in the form and you can submit it. This will cause the form to rerender and display a blank form. If you navigate to home, then the edited todo has been saved.

---

[&lt;-- Previous - 11. Working with External Data Part 2](./11-WorkingWithExternalDataPart3.md) | [Next - 13 - Single Page Applications Part 2 --&gt;](./13-SinglePageApplicationsPart2.md)