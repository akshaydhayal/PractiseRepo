import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Todo{
  title:string;
  description:string;
  completed:boolean;
}
type todoType=Todo[];

function TodoItems() {
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <div>
      <Header />
      <AddTodo setTodos={setTodos} todos={todos} />
      <GetTodos setTodos={setTodos} todos={todos} />
    </div>
  );
}
function Header() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function Init() {
      const response = await axios.get("http://localhost:3001/users/me", {
        headers: {
          token: localStorage.getItem("todoToken"),
        },
      });
      console.log(response.data);
      setUsername(response.data.username);
    }
    Init();
  }, []);

  return (
    <div>
      Welcome {username}
      <button
        onClick={() => {
          localStorage.setItem("todoToken", null);
          navigate("/signin");
        }}
      >
        Logout
      </button>
    </div>
  );
}

function AddTodo(props) {
// function AddTodo({ setTodos, todos }) {
  const todos=props.todos;
  const setTodos=props.setTodos;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div style={{ marginTop: "30px" }}>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={async () => {
          const response = await axios.post(
            "http://localhost:3001/todos",
            {
              title,
              description,
              completed: false,
            },
            {
              headers: {
                token: localStorage.getItem("todoToken"),
              },
            }
          );
          console.log(response.data);
          setTodos([...todos, response.data.todo]);
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

// function GetTodos({ setTodos, todos:Todo[]}) {
function GetTodos(props) {
  const todos:Todo[]=props.todos;
  const setTodos=props.setTodos;
  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:3001/todos", {
        headers: { token: localStorage.getItem("todoToken") },
      });
      console.log(response.data);
      const data:Todo[]=response.data;
      setTodos(data);
      // setTodos(response.data);
    }
    getData();
  }, []);

  return (
    <div>
      <h4>Todo List</h4>
      <div>
        <ul>
        {todos.map((t) => {
          return (
            <li>
              <div style={{ marginBottom: "7px" }}>
                <h3>{t.title}</h3>
                {t.description}
                {t.completed === false && (
                  <button
                    onClick={async () => {
                      const response = await axios.put(
                        "http://localhost:3001/todos/" + t._id,
                        {
                          completed: true,
                        },
                        {
                          headers: {
                            token: localStorage.getItem("todoToken"),
                          },
                        }
                      );
                      console.log(response.data);
                      let newTodos = todos.map((item) => {
                        return item._id == t._id
                          ? response.data.updatedTodo
                          : item;
                      });
                      setTodos(newTodos);
                    }}
                  >
                    Mark as done
                  </button>
                )}

                {t.completed === true && (
                  <button
                    onClick={async () => {
                      const response = await axios.put(
                        "http://localhost:3001/todos/" + t._id,
                        {
                          completed: false,
                        },
                        {
                          headers: { token: localStorage.getItem("todoToken") },
                        }
                      );
                      let newTodos = todos.map((item) => {
                        return item._id == t._id
                          ? response.data.updatedTodo
                          : item;
                      });
                      setTodos(newTodos);
                    }}
                  >
                    Mark as Undone
                  </button>
                )}
              </div>
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
}
export default TodoItems;
