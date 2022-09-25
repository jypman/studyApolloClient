import { Fragment } from "react";
import Fruit from "./components/Fruit";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Fragment>
      <Fruit />
      <TodoList />
    </Fragment>
  );
}

export default App;
