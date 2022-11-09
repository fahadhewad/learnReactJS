import { useEffect, useState } from 'react';
import axios from 'axios';

// import sampleTodos from './sampleTodos.json';

import Header from './Components/Header';
import Footer from './Components/Footer';
import AllTodos from './Components/AllTodos';
import AddEditTodo from './Components/AddEditTodo';
import Modal from './Components/utils/Modal';

function App() {

  const [todos, setTodos] = useState([]);
  const [getError, setGetError] = useState({ message: ``, count: 0 });
  const [postError, setPostError] = useState(``);

  const getTodos = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_TODOSURL);
      return res.data.length ? res.data : new Error(`There are no todos stored`);
    }
    catch (e) {
      setGetError({ message: `Data not available from the server: ${e.message}`, count: 0 });
      return [];
    }
  }

  useEffect(() => {
    const getData = async () => {
      setTodos(await getTodos());
    }
    setTimeout(() => getData(), 3000);
  }, []);

  // const submitTodo = todo => {
  //   const updatedTodos = [...todos, todo];
  //   setTodos(updatedTodos);
  // }

  const submitTodo = async todo => {
    try {
      setPostError(``);
      await axios.post(process.env.REACT_APP_TODOSURL, todo);
    }
    catch (e) {
      setPostError(`There was a problem adding the todo: ${e.message}`);
    }
    finally {
      setTodos(await getTodos());
    }
  }

  return (
    <>
      {getError.count === 0 && <Modal handleClose={() => setGetError({ ...getError, count: getError.count + 1 })} message={getError.message} />}
      {postError && <Modal handleClose={() => setPostError(``)} message={postError} />}
      <div className="container">
        <Header />
        <div className="container">
          <AllTodos data={{ todos, error: getError.message }} />
          <AddEditTodo submitTodo={submitTodo} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
