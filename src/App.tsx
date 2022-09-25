import { Fragment } from "react";
import Fruit from "./components/Fruit";
import Environment from "./components/Environment";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Fragment>
      <Fruit />
      <Environment />
      <TodoList />
    </Fragment>
  );
}

export default App;
