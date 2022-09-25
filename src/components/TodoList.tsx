import { gql, useQuery, NetworkStatus } from "@apollo/client";
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

  const GET_TODO = gql`
    query GetTodo($requestId: ID!) {
      Todo(id: $requestId) {
        id
        title
        checked
      }
    }
  `;

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_TODO, {
    variables: { requestId: 1 },
    notifyOnNetworkStatusChange: true, // 현재 networkStatus를 확인할 수 있도록 하는 옵션
  });

  /**
   * networkStatus :
   * 1 -> loading
   * 2 -> setVariables
   * 3 -> fetchMore
   * 4 -> refetch
   * 6 -> poll
   * 7 -> read,
   * 8 -> error
   * */
  if (networkStatus === NetworkStatus.refetch) return <div>refetching...</div>;

  if (loading) return <div>loading...</div>;

  if (error)
    return (
      <span
        style={{ cursor: "pointer", backgroundColor: "red", color: "white" }}
      >
        error ㅠㅠ
      </span>
    );

  return (
    <div>
      {[1, 2, 3].map((todoIndex) => (
        <div key={todoIndex} style={{ marginBottom: "5px" }}>
          <button
            type="button"
            onClick={() => refetch({ requestId: todoIndex })}
          >
            {todoIndex}번 todo 목록을 갖고 오고 싶으면 클릭!
          </button>
        </div>
      ))}
      <ul>
        {data.allTodos &&
          data.allTodos.map((todo: TodoListResponse) => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <input type="checkbox" defaultChecked={todo.checked === 1} />
            </li>
          ))}
        {data.Todo && (
          <li key={data.Todo.id}>
            <span>{data.Todo.title}</span>
            <input type="checkbox" defaultChecked={data.Todo.checked === 1} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
