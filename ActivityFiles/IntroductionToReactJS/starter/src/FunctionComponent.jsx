import ClassComponent from "./ClassComponent";

const FunctionComponent = () => {
    const title = `Hello World from variable`;
    return (
        <>
            {/* Comments inside of a return - evaluated as JS */}
            <h1>{title}</h1>
            <p>5 + 3 = {5 + 3}</p>
            <ClassComponent />
        </>
    );
}

export default FunctionComponent;