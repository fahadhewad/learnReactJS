import PropTypes from 'prop-types';
import './css/AllTodos.css';
// import sampleTodos from '../sampleTodos.json';
import Todo from './Todo';
import TodoModel from './utils/Todo.model';

const AllTodos = ({ data }) => {

  const todos = data.todos.map(currentTodo => {
    const { todoDescription, todoDateCreated, todoCompleted, _id } = currentTodo;
    const todo = new TodoModel(todoDescription, todoDateCreated, todoCompleted, _id);
    return <Todo todo={todo} key={todo._id} />
  });

  return (
    <div className="row">
      <h3>Todo List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos}
        </tbody>
      </table>
    </div>
  );
}

export default AllTodos;

AllTodos.propTypes = {
  data: PropTypes.exact({
    todos: PropTypes.arrayOf(PropTypes.exact({
      //
    }))
  })
}