import { todo } from "../../../models/todo.models";

function Todo(datas: todo[]) {
  return (
    <>
      <div>
        <h1>Todo</h1>
        <input type="text" />
      </div>
      <div>
        <ul>
          {datas.map((data: any) => (
            <li>{data.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const datas = await res.json();

  return {
    props: {
      datas,
    },
  };
}

export default Todo;
