import DateCreated from './utils/DateCreated';

const TodoForm = () => {

  return (
    <form>
      <div className="form-group">
        <label htmlFor="todoDescription">
          Description:&nbsp;
          <input type="text" className="form-control" name="todoDescription" id="todoDescription" placeholder="Todo Description" />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="todoDateCreated">
          Created on:&nbsp;
          <DateCreated />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="todoCompleted">
          Completed:&nbsp;
          <input type="checkbox" name="todoCompleted" id="todoCompleted" />
        </label>
      </div>
      <div className="form-group">
        <input type="submit" className="btn btn-primary" value="Submit" />
      </div>
    </form>
  );
}

export default TodoForm;