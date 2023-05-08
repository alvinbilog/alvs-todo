import { GetStaticProps } from 'next';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { MouseEventHandler } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: false;
};

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
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

  async function deleteHandler(id: number) {
    try {
      console.log(id);
      const res = await fetch(`http://localhost:3500/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((el) => el.id !== id));
    } catch (err: any) {
      console.log(err.message);
    }
  }
  async function updateHandler(todo: Todo) {
    const inputText: string | null = window.prompt('Edit task:');
    try {
      if (inputText !== null) {
        const res = await fetch(`http://localhost:3500/todos/${todo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: inputText,
          }),
        });
        const updatedTodo = await res.json();
        console.log(updatedTodo);
        setTodos((prevTodos) =>
          prevTodos.map((prevTodo) =>
            prevTodo.id === todo.id
              ? { ...prevTodo, text: inputText }
              : prevTodo
          )
        );
        console.log(todos);
      } else {
        console.log('User canceled the prompt.');
      }
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
            <li key={todo.id}>
              {todo.text}
              &nbsp; &nbsp;
              <button onClick={() => deleteHandler(todo.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
              <button onClick={() => updateHandler(todo)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </li>
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
