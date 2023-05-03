import { GetStaticProps } from 'next';
import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: false;
};

const Todo = ({ datas }: { datas: Todo[] }) => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<Todo[]>(datas);

  async function addTodo() {
    try {
      const res = await fetch('http://localhost:3500/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          completed: false,
        }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <>
      <h1>Todo</h1>
      <div>
        <input type="text" onChange={(e) => setInputText(e.target.value)} />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        <ul>
          {todos.map((todo) => (
            <ul key={todo.id}>{todo.text}</ul>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;

export async function getStaticProps() {
  const res = await fetch('http://localhost:3500/todos');
  const datas = await res.json();
  return {
    props: { datas },
  };
}
