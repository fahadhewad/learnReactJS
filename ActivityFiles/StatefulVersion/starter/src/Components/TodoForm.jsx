import { useState } from 'react';
import DateCreated from './utils/DateCreated';

const TodoForm = () => {
  const [todoDescription, setTodoDescription] = useState(``);
  const [todoCompleted, setTodoCompleted] = useState(false);
  const [todoDateCreated, setTodoDateCreated] = useState(null);

  return (
    <form>
      <div className="form-group">
        <label htmlFor="todoDescription">
          Description:&nbsp;
          <input
            type="text"
            className="form-control"
            name="todoDescription"
            id="todoDescription"
            placeholder="Todo Description"
            value={todoDescription}
            onChange={e => setTodoDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="todoDateCreated">
          Created on:&nbsp;
          <DateCreated updateDateCreated={dateCreated => setTodoDateCreated(dateCreated)} />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="todoCompleted">
          Completed:&nbsp;
          <input
            type="checkbox"
            name="todoCompleted"
            id="todoCompleted"
            checked={todoCompleted}
            onChange={e => setTodoCompleted(e.target.checked)}
          />
        </label>
      </div>
      <div className="form-group">
        <input
          type="submit"
          className={`btn ${todoDescription ? `btn-primary` : `btn-danger`}`}
          value="Submit"
          disabled={!todoDescription}
        />

      </div>
    </form>
  );
}

export default TodoForm;