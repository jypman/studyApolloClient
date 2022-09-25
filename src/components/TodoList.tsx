import { gql, useQuery } from "@apollo/client";
import { TodoListResponse } from "../type/dataInterface";

const TodoList = (): JSX.Element => {
  const GET_TODO_LIST = gql`
    query GetTodoList {
      allTodos {
        id
        title
        checked
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_TODO_LIST);

  if (loading) return <div>loading...</div>;

  if (error)
    return (
      <span
        style={{ cursor: "pointer", backgroundColor: "red", color: "white" }}
        onClick={refetch}
      >
        error ㅠㅠ retry??
      </span>
    );

  return (
    <div>
      <ol>
        {data.allTodos.map((todo: TodoListResponse) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <input type="checkbox" defaultChecked={todo.checked === 1} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TodoList;
