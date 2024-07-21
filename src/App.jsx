import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./navbar";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handlechange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDel = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    if (todo) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    } else alert("Enter some todos to add");
    saveToLS();
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <div className="body bg-purple-100 h-[100vh] w-auto">
      <Navbar />
      <div className="mx-3 md:container my-3 md:mx-auto bg-purple-200 px-6 py-2 max-h-auto md:w-1/2 align-middle rounded-lg">
      <h2 className="head font-bold text-2xl text-center py-3">iTodo!! Add your Daily Todos here</h2>
        <h2 className="text text-xl text-black py-2 font-bold">Add Todos</h2>
        <div className="todo font-bold ">
          <input
            type="text"
            className="text-lg max-h-screen w-full rounded-lg  border border-purple-300 px-3 focus:outline-none focus:border-purple-800"
            value={todo}
            onChange={handlechange}
          />
          <button
            onClick={handleAdd}
            className="btn bg-purple-500 hover:bg-purple-700 my-3 py-1 px-3 w-full rounded-lg"
          ><label htmlFor="" className="text-white">Add </label>
          </button>
        </div>
        <h2 className="text text-xl text-black py-2 font-bold">Your Todos</h2>
        <input
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
          className="my-3"
        />{" "}
        Show FInished
        {todos.length === 0 ? (
          <div className="mx-3 my-3">No todos to show</div>
        ) : (
          ""
        )}
        {todos.map((item) => {
          return (
            (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todos flex my-3 w-auto justify-between"
              >
                <div className="flex gap-5 ">
                  <input
                    name={item.id}
                    onChange={handlecheckbox}
                    type="checkbox"
                    className=""
                    checked={item.isCompleted}
                  />
                  <div
                    className={
                      item.isCompleted
                        ? "line-through my-1 text-lg"
                        : "my-1 text-xl font-bold"
                    }
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="btn bg-purple-400 hover:bg-purple-500 px-3 py-1 text-xl rounded-lg mx-1"
                  >
                    <BiEdit />
                  </button>
                  <button
                    onClick={(e) => handleDel(e, item.id)}
                    className="btn bg-purple-400 hover:bg-purple-500 px-3 py-2 text-xl rounded-lg mx-1"
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default App;
