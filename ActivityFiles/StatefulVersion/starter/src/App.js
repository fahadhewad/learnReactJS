import { useState } from 'react';

import AddEditTodo from './Components/AddEditTodo';
import AllTodos from './Components/AllTodos';
import Footer from './Components/Footer';
import Header from './Components/Header';

import sampleTodos from './sampleTodos.json';

function App() {
  const [todos, setTodos] = useState(sampleTodos);
  return (
    <div className="container">
      <Header />
      <div className="container">
        <AllTodos data={{ todos }} />
        <AddEditTodo />
      </div>
      <Footer />
    </div>
  );
}

export default App;
