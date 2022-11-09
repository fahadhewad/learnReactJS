import { useState } from "react";

const StateExample = () => {
    const [name, setName] = useState(``);


    return (
        <input
            type="text"
            name="name"
            onChange={e => setName(e.target.value)}
            value={name}
        />
    );

    // const [count, setCount] = useState(0);

    // const changeClass = event => {
    //     // console.dir(event);
    //     console.dir(event.target);
    //     event.target.addClass(`mouseevent`);
    // }

    // return (
    //     <div>
    //         <p
    //             onMouseEnter={event => changeClass(event)}
    //             onMouseOut={event => changeClass(event)}
    //         >
    //             Count value is: {count}
    //         </p>
    //         <button onClick={() => setCount(count + 1)}>
    //             Add 1 to Count
    //         </button>
    //         <MyNewComponent number={count} />
    //     </div>
    // );
};

export default StateExample;

// const MyNewComponent = ({ number }) => <p>Count value received as props {number}</p>;
