import AnotherComponent from "./AnotherComponent"
import ComponentWithProps from "./ComponentWithProps"
import MyClassComponent from "./MyClassComponent"

const MyComponent = () => {
  return (
    <>
      <h1>Hello World</h1>
      <AnotherComponent />
      <MyClassComponent />
      <ComponentWithProps />
      <ComponentWithProps content="Content from props" number={10} />
    </>
  );
}

export default MyComponent;