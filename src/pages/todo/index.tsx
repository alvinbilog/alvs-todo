import { useState } from "react";
import { todo } from "../../../models/todo.models";

export async function getStaticProps() {
  const res = await fetch(" http://localhost:3500/todos");
  const datas = await res.json();

  return {
    props: {
      datas,
    },
  };
}

function Todo({ datas }: { datas: todo[] }) {
  const [inputText, setinputText] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodo = (e: Event) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <h1>Todo</h1>
        <input onChange={e => setinputText(e.target.value)} type="text" />
        <button>Add</button>
      </div>
      <div>
        <ul>
          {datas.map((data: any) => (
            <li key={data.id}>{data.todo}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todo;
